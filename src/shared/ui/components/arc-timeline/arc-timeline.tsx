"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ArcTimelineStep {
  icon: ReactNode;
  content: ReactNode;
}

interface ArcTimelineItem {
  time: ReactNode;
  steps: ArcTimelineStep[];
}

interface ArcTimelineConfig {
  circleWidth?: number;
  angleBetweenMinorSteps?: number;
  lineCountFillBetweenSteps?: number;
  boundaryPlaceholderLinesCount?: number;
}

interface ArcTimelineProps extends React.ComponentProps<"div"> {
  data: ArcTimelineItem[];
  arcConfig?: ArcTimelineConfig;
  defaultActiveStep?: { time?: string; stepIndex?: number };
}

function PlaceholderLines({
  isFirstStep,
  isLastStep,
  angle,
  angleBetweenMinorSteps,
  lineCountFillBetweenSteps,
  boundaryPlaceholderLinesCount,
  lineIndex,
  stepIndex,
  circleWidth,
  circleContainerRotateDeg,
}: {
  isFirstStep: boolean;
  isLastStep: boolean;
  angle: number;
  angleBetweenMinorSteps: number;
  lineCountFillBetweenSteps: number;
  boundaryPlaceholderLinesCount: number;
  lineIndex: number;
  stepIndex: number;
  circleWidth: number;
  circleContainerRotateDeg: number;
}) {
  const getAngle = (index: number) =>
    isFirstStep
      ? index * angleBetweenMinorSteps
      : angle + (index + 1) * angleBetweenMinorSteps;

  return (
    <>
      {Array.from({
        length:
          isLastStep || isFirstStep
            ? boundaryPlaceholderLinesCount
            : lineCountFillBetweenSteps,
      }).map((_, fillIndex) => {
        const fillAngle = getAngle(fillIndex);
        return (
          <div
            key={`${lineIndex}-${stepIndex}-${fillIndex}`}
            className="absolute top-0 left-1/2 h-[34px] w-[1px] -translate-x-1/2"
            style={{
              transformOrigin: `50% ${circleWidth / 2}px`,
              transform: `rotate(${fillAngle}deg)`,
            }}
          >
            <div
              className="bg-muted-foreground/40 h-full w-full"
              style={{
                transformOrigin: "center top",
                transform: `rotate(${-1 * fillAngle - circleContainerRotateDeg}deg)`,
              }}
            />
          </div>
        );
      })}
    </>
  );
}

function ArcTimeline({
  className,
  data,
  arcConfig = {},
  defaultActiveStep = {},
  ...props
}: ArcTimelineProps) {
  const {
    circleWidth = 5000,
    angleBetweenMinorSteps = 0.35,
    lineCountFillBetweenSteps = 10,
    boundaryPlaceholderLinesCount = 50,
  } = arcConfig;

  const {
    time: defaultActiveTime = data[0]?.time,
    stepIndex: defaultActiveStepIndex = 0,
  } = defaultActiveStep;

  const [circleContainerRotateDeg, setCircleContainerRotateDeg] = useState(
    () => {
      let count = 0;
      for (const item of data) {
        if (item.time === defaultActiveTime) {
          count += defaultActiveStepIndex;
          break;
        } else {
          count += item.steps.length;
        }
      }
      return (
        -1 * count * angleBetweenMinorSteps * (lineCountFillBetweenSteps + 1) -
        angleBetweenMinorSteps * boundaryPlaceholderLinesCount
      );
    },
  );

  return (
    <div
      data-slot="arc-timeline"
      className={cn("relative h-[380px] w-full overflow-hidden", className)}
      {...props}
    >
      <div
        style={{
          transform: `translateX(-50%) rotate(${circleContainerRotateDeg}deg)`,
          width: `${circleWidth}px`,
        }}
        className="absolute top-28 left-1/2 aspect-square origin-center rounded-full transition-all duration-500 ease-in-out"
      >
        {data.map((line, lineIndex) => (
          <div key={lineIndex}>
            {line.steps.map((step, stepIndex) => {
              const angle =
                angleBetweenMinorSteps *
                  (lineCountFillBetweenSteps + 1) *
                  (data
                    .slice(0, lineIndex)
                    .reduce((sum, item) => sum + item.steps.length, 0) +
                    stepIndex) +
                angleBetweenMinorSteps * boundaryPlaceholderLinesCount;
              const isActive =
                Math.abs(angle + circleContainerRotateDeg) < 0.01;
              const isFirstStep = lineIndex === 0 && stepIndex === 0;
              const isLastStep =
                lineIndex === data.length - 1 &&
                stepIndex === line.steps.length - 1;

              return (
                <div key={`${lineIndex}-${stepIndex}`}>
                  {isFirstStep && (
                    <PlaceholderLines
                      isFirstStep
                      isLastStep={false}
                      angle={angle}
                      angleBetweenMinorSteps={angleBetweenMinorSteps}
                      lineCountFillBetweenSteps={lineCountFillBetweenSteps}
                      boundaryPlaceholderLinesCount={
                        boundaryPlaceholderLinesCount
                      }
                      lineIndex={lineIndex}
                      stepIndex={stepIndex}
                      circleWidth={circleWidth}
                      circleContainerRotateDeg={circleContainerRotateDeg}
                    />
                  )}
                  <div
                    className={cn(
                      "absolute top-0 left-1/2 -translate-x-1/2 cursor-pointer transition-all duration-200",
                      isActive ? "h-[120px] w-[2px]" : "h-16 w-[1.5px]",
                    )}
                    style={{
                      transformOrigin: `50% ${circleWidth / 2}px`,
                      transform: `rotate(${angle}deg)`,
                    }}
                    onClick={() => setCircleContainerRotateDeg(-1 * angle)}
                  >
                    <div
                      className={cn(
                        "h-full w-full transition-colors duration-200",
                        isActive ? "bg-foreground" : "bg-muted-foreground/50",
                      )}
                      style={{
                        transformOrigin: "center top",
                        transform: `rotate(${-1 * angle - circleContainerRotateDeg}deg)`,
                      }}
                    >
                      <div
                        className={cn(
                          "absolute bottom-0 left-1/2 aspect-square -translate-x-1/2",
                          isActive
                            ? "text-foreground translate-y-[calc(100%+14px)] scale-[1.2]"
                            : "text-muted-foreground translate-y-[calc(100%+4px)]",
                        )}
                      >
                        {step.icon}
                      </div>
                      <p
                        className={cn(
                          "text-muted-foreground absolute bottom-0 left-1/2 line-clamp-3 flex w-[240px] -translate-x-1/2 translate-y-[calc(100%+42px)] items-center justify-center text-center text-sm transition-opacity duration-300",
                          isActive ? "opacity-100" : "opacity-0",
                        )}
                      >
                        {step.content}
                      </p>
                    </div>
                    {stepIndex === 0 && (
                      <div
                        className={cn(
                          "absolute top-0 left-1/2 z-10 -translate-x-1/2 translate-y-[calc(-100%-24px)] whitespace-nowrap",
                          isActive
                            ? "text-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        {line.time}
                      </div>
                    )}
                  </div>
                  <PlaceholderLines
                    isFirstStep={false}
                    isLastStep={isLastStep}
                    angle={angle}
                    angleBetweenMinorSteps={angleBetweenMinorSteps}
                    lineCountFillBetweenSteps={lineCountFillBetweenSteps}
                    boundaryPlaceholderLinesCount={
                      boundaryPlaceholderLinesCount
                    }
                    lineIndex={lineIndex}
                    stepIndex={stepIndex}
                    circleWidth={circleWidth}
                    circleContainerRotateDeg={circleContainerRotateDeg}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export {
  ArcTimeline,
  type ArcTimelineProps,
  type ArcTimelineItem,
  type ArcTimelineStep,
  type ArcTimelineConfig,
};
