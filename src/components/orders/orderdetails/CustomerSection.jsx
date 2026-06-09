import SectionTitle from "./SectionTitle";

export default function CustomerSection({
    customer,
}) {
    return (
        <div className="mb-4">
            <SectionTitle title="Customer" />

            <div className="space-y-1 text-[13px] text-slate-700">
                <p>
                    <span className="font-semibold">
                        Name:
                    </span>{" "}
                    {customer?.name ||
                        "-"}
                </p>

                <p>
                    <span className="font-semibold">
                        Email:
                    </span>{" "}
                    {customer?.email ||
                        "-"}
                </p>

                <p>
                    <span className="font-semibold">
                        Phone:
                    </span>{" "}
                    {customer?.phone ||
                        "-"}
                </p>
            </div>
        </div>
    );
}