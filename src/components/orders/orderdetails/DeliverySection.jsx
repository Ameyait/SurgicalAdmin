import SectionTitle from "./SectionTitle";

export default function DeliverySection() {
    return (
        <>
            <SectionTitle title="Delivery" />

            <div className="bg-slate-50 rounded-[22px] px-3 mb-4">
                <div className="flex justify-between text-[12px]">
                    <span className="text-slate-500">
                        Courier
                    </span>

                    <span className="font-semibold">
                        -
                    </span>
                </div>

                <div className="flex justify-between text-[12px] mt-2">
                    <span className="text-slate-500">
                        Tracking ID
                    </span>

                    <span>-</span>
                </div>
            </div>
        </>
    );
}