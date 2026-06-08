import SectionTitle from "./SectionTitle";

export default function TimelineSection({
    timelineSteps,
    currentStep,
    orderStatus,
}) {
    return (
        <>
            <SectionTitle title="Timeline" />

            <div className="relative ml-3 mb-9">
                <div className="absolute left-[7px] top-3 bottom-3 w-0.5 bg-slate-200"></div>

                {timelineSteps.map((step, index) => {
                    const isActive =
                        orderStatus !== "cancelled" &&
                        index <= currentStep;

                    return (
                        <div
                            key={step}
                            className="relative flex items-center gap-5 mb-5"
                        >
                            <span
                                className={`h-4 w-4 rounded-full border-4 z-10 ${
                                    isActive
                                        ? "bg-emerald-500 border-emerald-500"
                                        : index === 0 &&
                                          orderStatus ===
                                              "cancelled"
                                        ? "bg-emerald-500 border-emerald-500"
                                        : "bg-white border-slate-200"
                                }`}
                            />

                            <span
                                className={`text-[10px] ${
                                    isActive ||
                                    (index === 0 &&
                                        orderStatus ===
                                            "cancelled")
                                        ? "text-[#020617]"
                                        : "text-slate-500"
                                }`}
                            >
                                {step}
                            </span>
                        </div>
                    );
                })}
            </div>
        </>
    );
}