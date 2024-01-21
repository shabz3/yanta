import {
  Card,
  Skeleton,

} from "@nextui-org/react";

function CardSkeleton() {
  return (
    <Card className="mt-20 mx-20 p-4" radius="lg">
      <div className="space-y-20">
        <Skeleton className="rounded-lg">
          <div className="h-14 rounded-lg bg-default-300"></div>
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="h-56 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
      <div className="mt-10">
        <Skeleton className="rounded-lg">
          <div className="h-10 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </Card>
  );
}

export default CardSkeleton;
