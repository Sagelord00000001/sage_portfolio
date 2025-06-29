"use client";
import React, { useEffect, useRef, useCallback, useMemo } from "react";

const DEFAULT_BEHIND_GRADIENT =
  "radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),hsla(266,100%,90%,var(--card-opacity)) 4%,hsla(266,50%,80%,calc(var(--card-opacity)*0.75)) 10%,hsla(266,25%,70%,calc(var(--card-opacity)*0.5)) 50%,hsla(266,0%,60%,0) 100%),radial-gradient(35% 52% at 55% 20%,#00ffaac4 0%,#073aff00 100%),radial-gradient(100% 100% at 50% 50%,#00c1ffff 1%,#073aff00 76%),conic-gradient(from 124deg at 50% 50%,#c137ffff 0%,#07c6ffff 40%,#07c6ffff 60%,#c137ffff 100%)";

const DEFAULT_INNER_GRADIENT =
  "linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)";

const ANIMATION_CONFIG = {
  SMOOTH_DURATION: 600,
  INITIAL_DURATION: 1500,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
};

const clamp = (value, min = 0, max = 100) =>
  Math.min(Math.max(value, min), max);

const round = (value, precision = 3) =>
  parseFloat(value.toFixed(precision));

const adjust = (
  value,
  fromMin,
  fromMax,
  toMin,
  toMax
) =>
  round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));

const easeInOutCubic = (x) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

const ProfileCardComponent = ({
  avatarUrl = "./avater.png",
  iconUrl = "<Placeholder for icon URL>",
  grainUrl = "<Placeholder for grain URL>",
  behindGradient,
  innerGradient,
  showBehindGradient = true,
  className = "",
  enableTilt = true,
  miniAvatarUrl,
  name = "Javi A. Torres",
  handle = "javicodes",
  status = "Online",
  contactText = "Contact",
  showUserInfo = true,
  onContactClick,
}) => {
  const wrapRef = useRef(null);
  const cardRef = useRef(null);

  const animationHandlers = useMemo(() => {
    if (!enableTilt) return null;

    let rafId = null;

    const updateCardTransform = (
      offsetX,
      offsetY,
      card,
      wrap
    ) => {
      const width = card.clientWidth;
      const height = card.clientHeight;

      const percentX = clamp((100 / width) * offsetX);
      const percentY = clamp((100 / height) * offsetY);

      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties = {
        "--pointer-x": `${percentX}%`,
        "--pointer-y": `${percentY}%`,
        "--background-x": `${adjust(percentX, 0, 100, 35, 65)}%`,
        "--background-y": `${adjust(percentY, 0, 100, 35, 65)}%`,
        "--pointer-from-center": `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        "--pointer-from-top": `${percentY / 100}`,
        "--pointer-from-left": `${percentX / 100}`,
        "--rotate-x": `${round(-(centerX / 5))}deg`,
        "--rotate-y": `${round(centerY / 4)}deg`,
      };

      Object.entries(properties).forEach(([property, value]) => {
        wrap.style.setProperty(property, value);
      });
    };

    const createSmoothAnimation = (
      duration,
      startX,
      startY,
      card,
      wrap
    ) => {
      const startTime = performance.now();
      const targetX = wrap.clientWidth / 2;
      const targetY = wrap.clientHeight / 2;

      const animationLoop = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = clamp(elapsed / duration);
        const easedProgress = easeInOutCubic(progress);

        const currentX = adjust(easedProgress, 0, 1, startX, targetX);
        const currentY = adjust(easedProgress, 0, 1, startY, targetY);

        updateCardTransform(currentX, currentY, card, wrap);

        if (progress < 1) {
          rafId = requestAnimationFrame(animationLoop);
        }
      };

      rafId = requestAnimationFrame(animationLoop);
    };

    return {
      updateCardTransform,
      createSmoothAnimation,
      cancelAnimation: () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
    };
  }, [enableTilt]);

  const handlePointerMove = useCallback(
    (event) => {
      const card = cardRef.current;
      const wrap = wrapRef.current;

      if (!card || !wrap || !animationHandlers) return;

      const rect = card.getBoundingClientRect();
      animationHandlers.updateCardTransform(
        event.clientX - rect.left,
        event.clientY - rect.top,
        card,
        wrap
      );
    },
    [animationHandlers]
  );

  const handlePointerEnter = useCallback(() => {
    const card = cardRef.current;
    const wrap = wrapRef.current;

    if (!card || !wrap || !animationHandlers) return;

    animationHandlers.cancelAnimation();
    wrap.classList.add("active");
    card.classList.add("active");
  }, [animationHandlers]);

  const handlePointerLeave = useCallback(
    (event) => {
      const card = cardRef.current;
      const wrap = wrapRef.current;

      if (!card || !wrap || !animationHandlers) return;

      animationHandlers.createSmoothAnimation(
        ANIMATION_CONFIG.SMOOTH_DURATION,
        event.offsetX,
        event.offsetY,
        card,
        wrap
      );
      wrap.classList.remove("active");
      card.classList.remove("active");
    },
    [animationHandlers]
  );

  useEffect(() => {
    if (!enableTilt || !animationHandlers) return;

    const card = cardRef.current;
    const wrap = wrapRef.current;

    if (!card || !wrap) return;

    const pointerMoveHandler = handlePointerMove;
    const pointerEnterHandler = handlePointerEnter;
    const pointerLeaveHandler = handlePointerLeave;

    card.addEventListener("pointerenter", pointerEnterHandler);
    card.addEventListener("pointermove", pointerMoveHandler);
    card.addEventListener("pointerleave", pointerLeaveHandler);

    const initialX = wrap.clientWidth - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;

    animationHandlers.updateCardTransform(initialX, initialY, card, wrap);
    animationHandlers.createSmoothAnimation(
      ANIMATION_CONFIG.INITIAL_DURATION,
      initialX,
      initialY,
      card,
      wrap
    );

    return () => {
      card.removeEventListener("pointerenter", pointerEnterHandler);
      card.removeEventListener("pointermove", pointerMoveHandler);
      card.removeEventListener("pointerleave", pointerLeaveHandler);
      animationHandlers.cancelAnimation();
    };
  }, [
    enableTilt,
    animationHandlers,
    handlePointerMove,
    handlePointerEnter,
    handlePointerLeave,
  ]);

  const cardStyle = useMemo(
    () =>
    ({
      "--icon": iconUrl ? `url(${iconUrl})` : "none",
      "--grain": grainUrl ? `url(${grainUrl})` : "none",
      "--behind-gradient": showBehindGradient
        ? (behindGradient ?? DEFAULT_BEHIND_GRADIENT)
        : "none",
      "--inner-gradient": innerGradient ?? DEFAULT_INNER_GRADIENT,
    }),
    [iconUrl, grainUrl, showBehindGradient, behindGradient, innerGradient]
  );

  const handleContactClick = useCallback(() => {
    onContactClick?.();
  }, [onContactClick]);

  return (
    <div
      ref={wrapRef}
      className={`relative perspective-500 transform-gpu touch-none border border-white/10 shadow-[inset_0_0_10px_rgba(255,255,255,0.1)]  ${className}`.trim()}
      style={cardStyle}
    >
      {/* Card wrapper pseudo-element */}
      <div className="absolute -inset-[10px] bg-inherit bg-[position:inherit] rounded-[inherit] transition-all duration-500 ease-[ease] filter contrast-[2] saturate-[2] blur-[36px] scale-80 transform-gpu bg-[length:100%_100%] bg-[image:var(--behind-gradient)] group-hover:filter-contrast-[1] group-hover:saturate-[2] group-hover:blur-[40px] group-hover:opacity-[1] group-hover:scale-90 group-active:filter-contrast-[1] group-active:saturate-[2] group-active:blur-[40px] group-active:opacity-[1] group-active:scale-9 "></div>

      <section
        ref={cardRef}
        className="h-[100vh] max-h-[700px] grid aspect-[0.718] rounded-[30px] relative bg-blend-[color-dodge,normal,normal,normal] shadow-[rgba(0,0,0,0.8)_calc((var(--pointer-from-left)_*_10px)_-_3px)_calc((var(--pointer-from-top)_*_20px)_-_6px)_20px_-5px] transition-transform duration-[1s] ease-[ease] transform-gpu bg-[length:100%_100%] bg-[position:0_0,0_0,50%_50%,0_0] bg-[image:radial-gradient(farthest-side_circle_at_var(--pointer-x)_var(--pointer-y),hsla(266,100%,90%,var(--card-opacity))_4%,hsla(266,50%,80%,calc(var(--card-opacity)*0.75))_10%,hsla(266,25%,70%,calc(var(--card-opacity)*0.5))_50%,hsla(266,0%,60%,0)_100%),radial-gradient(35%_52%_at_55%_20%,#00ffaac4_0%,#073aff00_100%),radial-gradient(100%_100%_at_50%_50%,#00c1ffff_1%,#073aff00_76%),conic-gradient(from_124deg_at_50%_50%,#c137ffff_0%,#07c6ffff_40%,#07c6ffff_60%,#c137ffff_100%)] overflow-hidden group-hover:transition-none group-hover:transform-gpu group-hover:rotate-x-[var(--rotate-y)] group-hover:rotate-y-[var(--rotate-x)] group-active:transition-none group-active:transform-gpu group-active:rotate-x-[var(--rotate-y)] group-active:rotate-y-[var(--rotate-x)]"
      >
        <div className="absolute inset-[1px] bg-[image:var(--inner-gradient)] bg-[rgba(0,0,0,0.9)] transform-gpu rounded-[30px]">
          <div
            className="mask-[image:var(--icon)] mask-mode-[luminance] mask-repeat-[repeat] mask-size-[150%] mask-position-[top_calc(200%_-_(var(--background-y)_*_5))_left_calc(100%_-_var(--background-x))] transition-filter duration-[0.6s] ease-[ease] filter brightness-[0.66] contrast-[1.33] saturate-[0.33] opacity-[0.5] mix-blend-[color-dodge] overflow-hidden z-[3] transform-gpu rounded-[30px] bg-[position:0_var(--background-y),var(--background-x)_var(--background-y),center] bg-blend-[color,hard-light] bg-[size:500%_500%,300%_300%,200%_200%] bg-repeat-[repeat] group-hover:filter brightness-[0.85] contrast-[1.5] saturate-[0.5] group-active:filter brightness-[0.85] contrast-[1.5] saturate-[0.5]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, var(--sunpillar-clr-1) calc(var(--space) * 1), var(--sunpillar-clr-2) calc(var(--space) * 2), var(--sunpillar-clr-3) calc(var(--space) * 3), var(--sunpillar-clr-4) calc(var(--space) * 4), var(--sunpillar-clr-5) calc(var(--space) * 5), var(--sunpillar-clr-6) calc(var(--space) * 6), var(--sunpillar-clr-1) calc(var(--space) * 7)), repeating-linear-gradient(var(--angle), #0e152e 0%, hsl(180, 10%, 60%) 3.8%, hsl(180, 29%, 66%) 4.5%, hsl(180, 10%, 60%) 5.2%, #0e152e 10%, #0e152e 12%), radial-gradient(farthest-corner circle at var(--pointer-x) var(--pointer-y), hsla(0, 0%, 0%, 0.1) 12%, hsla(0, 0%, 0%, 0.15) 20%, hsla(0, 0%, 0%, 0.25) 120%)",
            }}
          >
            <div className="grid-area-[1/1] opacity-0 group-hover:opacity-100 group-active:opacity-100 bg-[image:linear-gradient(45deg,var(--sunpillar-4),var(--sunpillar-5),var(--sunpillar-6),var(--sunpillar-1),var(--sunpillar-2),var(--sunpillar-3)),radial-gradient(circle_at_var(--pointer-x)_var(--pointer-y),hsl(0,0%,70%)_0%,hsla(0,0%,30%,0.2)_90%),var(--grain)] bg-[size:250%_250%,100%_100%,220px_220px] bg-[position:var(--pointer-x)_var(--pointer-y),center,calc(var(--pointer-x)_*_0.01)_calc(var(--pointer-y)_*_0.01)] bg-blend-[color-dodge] filter brightness-[calc(2_-_var(--pointer-from-center))] contrast-[calc(var(--pointer-from-center)_+_2)] saturate-[calc(0.5_+_var(--pointer-from-center))] mix-blend-[luminosity]"></div>
            <div className="grid-area-[1/1] opacity-0 group-hover:opacity-100 group-active:opacity-100 bg-[position:0_var(--background-y),calc(var(--background-x)_*_0.4)_calc(var(--background-y)_*_0.5),center] bg-[size:200%_300%,700%_700%,100%_100%] mix-blend-[difference] filter brightness-[0.8] contrast-[1.5]"></div>
          </div>

          <div className="overflow-hidden transform-gpu rounded-[30px] mix-blend-[overlay] filter brightness-[0.8] contrast-[1.2] z-[4] bg-[image:radial-gradient(farthest-corner_circle_at_var(--pointer-x)_var(--pointer-y),hsl(248,25%,80%)_12%,hsla(207,40%,30%,0.8)_90%)]"></div>

          <div className="mix-blend-[screen] overflow-hidden grid rounded-[30px]">
            <img
              className="w-full absolute left-1/2 -translate-x-1/2 scale-100 bottom-[2px] opacity-[calc(1.75_-_var(--pointer-from-center))]"
              src={avatarUrl}
              alt={`${name || "User"} avatar`}
              loading="lazy"
              onError={(e) => {
                const target = e.target;
                target.style.display = "none";
              }}
            />
            <div className="absolute inset-0 z-[1] backdrop-filter backdrop-blur-[30px] mask-[linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,0)_60%,rgba(0,0,0,1)_90%,rgba(0,0,0,1)_100%)] pointer-events-none"></div>

            {showUserInfo && (
              <div className="absolute bottom-[20px] left-[20px] right-[20px] z-[2] flex items-center justify-between bg-[rgba(255,255,255,0.1)] backdrop-filter backdrop-blur-[30px] border border-[rgba(255,255,255,0.1)] rounded-[15px] p-[12px_14px] pointer-events-auto">
                <div className="flex items-center gap-[12px]">
                  <div className="w-[48px] h-[48px] rounded-full overflow-hidden border border-[rgba(255,255,255,0.1)] flex-shrink-0">
                    <img
                      src={miniAvatarUrl || avatarUrl}
                      alt={`${name || "User"} mini avatar`}
                      className="w-full h-full object-cover rounded-full"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target;
                        target.style.opacity = "0.5";
                        target.src = avatarUrl;
                      }}
                    />
                  </div>
                  <div className="flex flex-col items-start gap-[6px]">
                    <div className="text-[14px] font-medium text-[rgba(255,255,255,0.9)] leading-none">
                      @{handle}
                    </div>
                    <div className="text-[14px] text-[rgba(255,255,255,0.7)] leading-none">
                      {status}
                    </div>
                  </div>
                </div>
                <button
                  className="border border-[rgba(255,255,255,0.1)] rounded-[8px] px-[16px] py-[8px] text-[14px] font-semibold text-[rgba(255,255,255,0.9)] cursor-pointer transition-all duration-200 ease-[ease] backdrop-filter backdrop-blur-[10px] hover:border-[rgba(255,255,255,0.4)] hover:-translate-y-[1px]"
                  onClick={handleContactClick}
                  style={{ pointerEvents: "auto" }}
                  type="button"
                  aria-label={`Contact ${name || "user"}`}
                >
                  {contactText}
                </button>
              </div>
            )}
          </div>

          <div className="max-h-full overflow-hidden text-center relative transform-gpu z-[5] mix-blend-[luminosity] translate-x-[calc(var(--pointer-from-left)_*_-6px_+_3px)] translate-y-[calc(var(--pointer-from-top)_*_-6px_+_3px)]">
            <div className="w-full absolute top-[3em] flex flex-col">
              <h3 className="font-semibold m-0 text-[min(5svh,3em)] m-0 bg-[linear-gradient(to_bottom,#fff,#6f6fbe)] bg-[length:1em_1.5em] text-transparent bg-clip-text">
                {name}
              </h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);

export default ProfileCard;