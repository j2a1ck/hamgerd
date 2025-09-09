import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toFarsiNumber } from "@/lib/utils";

interface EventRegisterCardProps {
  price: number;
  capacity: number | null | undefined;
  onRegister: () => void;
  startDate: Date;
}

export default function EventRegisterCard({
  price,
  capacity,
  onRegister,
  startDate,
}: EventRegisterCardProps) {
  const startDateObj = new Date(startDate);
  return (
    <Card className="sticky top-20 z-10">
      <CardHeader>
        <CardTitle>ثبت‌نام در رویداد</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between py-2">
          <span className="font-medium">قیمت:</span>
          <span>{price === 0 ? "رایگان" : `${toFarsiNumber(price)} تومان`}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="font-medium">ظرفیت :</span>
          <span>{toFarsiNumber(capacity)} نفر</span>
        </div>
        <Button
          size="lg"
          className={`w-full ${startDateObj < new Date() ? "bg-primary cursor-not-allowed text-white" : ""}`}
          disabled={startDateObj < new Date()}
          onClick={onRegister}
        >
          {startDateObj < new Date() ? "پایان زمان ثبت‌نام" : " ثبت‌نام در رویداد"}
        </Button>
      </CardContent>
    </Card>
  );
}
