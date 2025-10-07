import { Separator } from "@/components/ui/separator";

export function InfoRow({ icon, label, value, isLast = false }) {
    return (
        <>
            <div className="flex items-center justify-between py-4">
                <div className="flex items-center space-x-4">
                    <div className="text-gray-600">{icon}</div>
                    <span className="font-medium text-gray-800">{label}</span>
                </div>
                <span className="text-sm text-gray-600">{value}</span>
            </div>
            {!isLast && <Separator style={{ marginLeft: "35px" }} />}
        </>
    );
}
