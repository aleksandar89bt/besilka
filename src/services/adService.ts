import {
  AdMob,
  RewardAdOptions,
  RewardAdPluginEvents,
  BannerAdOptions,
  BannerAdPosition,
  BannerAdSize,
} from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

// Official Google Test Ad Unit IDs for Android
const TEST_REWARDED_ID = 'ca-app-pub-3940256099942544/5224354917';
const TEST_BANNER_ID = 'ca-app-pub-3940256099942544/6300978111';

/**
 * Initialize AdMob SDK on native mobile platforms.
 */
export async function initializeAds(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;

  try {
    await AdMob.initialize({
      initializeForTesting: true, // Set to false for production release
    });
  } catch (error) {
    console.error('Failed to initialize AdMob:', error);
  }
}

/**
 * Show a rewarded ad to unlock hints.
 * Returns true if the user watched the ad and earned the reward, false otherwise.
 */
export async function showRewardedHintAd(): Promise<boolean> {
  // Web browser fallback / simulation mode
  if (!Capacitor.isNativePlatform()) {
    // Check if Google H5 Games AdSense adBreak is available
    if (typeof window !== 'undefined' && (window as any).adBreak) {
      return new Promise((resolve) => {
        try {
          (window as any).adBreak({
            type: 'reward',
            name: 'hint_reward',
            beforeReward: (showAdFn: () => void) => {
              showAdFn();
            },
            adDismissed: () => {
              resolve(false);
            },
            adViewed: () => {
              resolve(true);
            },
            adBreakDone: (placementInfo: any) => {
              if (placementInfo.breakStatus === 'viewed') {
                resolve(true);
              } else {
                resolve(false);
              }
            },
          });
        } catch (e) {
          console.warn('AdSense adBreak failed, falling back to simulated reward', e);
          setTimeout(() => resolve(true), 1500);
        }
      });
    }

    // Default simulated reward modal for web testing
    return new Promise((resolve) => {
      const overlay = document.createElement('div');
      overlay.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in';
      
      let timeLeft = 5;
      let isCompleted = false;

      overlay.innerHTML = `
        <div class="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl text-white relative overflow-hidden flex flex-col items-center">
          <div class="absolute top-3 left-3 bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-amber-500/35">
            Симулација на реклама (Веб)
          </div>
          
          <div class="w-full aspect-video bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center justify-center my-6 relative overflow-hidden group">
            <div class="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-slate-950"></div>
            <div class="absolute inset-0 flex items-center justify-center opacity-20">
              <span class="text-7xl font-black tracking-widest text-indigo-400">POGODI</span>
            </div>
            
            <div class="relative z-10 text-center p-4">
              <div class="text-indigo-300 text-sm font-semibold mb-1">Спонзорирана содржина</div>
              <div class="text-xl font-bold text-white">Гледајте ја рекламата за да добиете совет</div>
            </div>
            
            <div class="absolute bottom-3 right-3 bg-black/70 px-3 py-1 rounded-lg text-xs font-mono text-slate-300 border border-slate-700">
              Реклама: <span id="ad-countdown" class="text-amber-400 font-bold">${timeLeft}</span>s
            </div>
          </div>

          <div class="w-full flex items-center justify-between gap-3 mt-2">
            <button id="ad-close-btn" class="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-400 text-xs font-semibold hover:bg-slate-700 hover:text-white transition opacity-50 cursor-not-allowed" disabled>
              Затвори (X)
            </button>
            <div id="ad-status-text" class="text-xs text-amber-300 font-medium">
              Остануваат уште ${timeLeft} секунди...
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(overlay);

      const countdownEl = overlay.querySelector('#ad-countdown') as HTMLElement;
      const closeBtn = overlay.querySelector('#ad-close-btn') as HTMLButtonElement;
      const statusText = overlay.querySelector('#ad-status-text') as HTMLElement;

      const timer = setInterval(() => {
        timeLeft -= 1;
        if (countdownEl) countdownEl.textContent = String(timeLeft);

        if (timeLeft <= 0) {
          clearInterval(timer);
          isCompleted = true;
          if (statusText) statusText.textContent = 'Реклама завршена! Награда отклучена.';
          if (statusText) statusText.className = 'text-xs text-emerald-400 font-semibold';
          if (closeBtn) {
            closeBtn.textContent = 'Земи награда ✓';
            closeBtn.disabled = false;
            closeBtn.className = 'px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-500 transition shadow-lg shadow-emerald-600/30';
          }
        }
      }, 1000);

      const handleResolve = (result: boolean) => {
        clearInterval(timer);
        if (document.body.contains(overlay)) {
          document.body.removeChild(overlay);
        }
        resolve(result);
      };

      closeBtn.addEventListener('click', () => {
        handleResolve(isCompleted);
      });
      
      // Also allow clicking backdrop if completed
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay && isCompleted) {
          handleResolve(true);
        }
      });
    });
  }

  // Native Android / iOS AdMob Rewarded Ad
  return new Promise(async (resolve) => {
    let earnedReward = false;

    const rewardListener = await AdMob.addListener(
      RewardAdPluginEvents.Rewarded,
      () => {
        earnedReward = true;
      }
    );

    const dismissListener = await AdMob.addListener(
      RewardAdPluginEvents.Dismissed,
      () => {
        rewardListener.remove();
        dismissListener.remove();
        resolve(earnedReward);
      }
    );

    const failListener = await AdMob.addListener(
      RewardAdPluginEvents.FailedToLoad,
      () => {
        rewardListener.remove();
        dismissListener.remove();
        failListener.remove();
        resolve(false);
      }
    );

    try {
      const options: RewardAdOptions = {
        adId: TEST_REWARDED_ID,
        isTesting: true, // Set to false for production
      };

      await AdMob.prepareRewardVideoAd(options);
      await AdMob.showRewardVideoAd();
    } catch (e) {
      console.error('Error showing rewarded ad:', e);
      rewardListener.remove();
      dismissListener.remove();
      failListener.remove();
      resolve(false);
    }
  });
}

/**
 * Show a passive top banner ad (Android/iOS only).
 */
export async function showBannerAd(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;

  try {
    const options = {
      adId: TEST_BANNER_ID,
      position: BannerAdPosition.TOP_CENTER,
      size: BannerAdSize.BANNER,
      margin: 0,
      isTesting: true,
    } as BannerAdOptions;
    await AdMob.showBanner(options);
  } catch (e) {
    console.error('Failed to show banner ad:', e);
  }
}

/**
 * Hide banner ad.
 */
export async function hideBannerAd(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;
  try {
    await AdMob.hideBanner();
  } catch (e) {
    console.error('Failed to hide banner ad:', e);
  }
}
