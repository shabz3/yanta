import React from "react";
import { Card, Skeleton, CardHeader } from "@nextui-org/react";

function NoteCellSkeleton() {
  return (
    <Card className="h-56 mx-10 p-5" radius="lg">
      <div className="space-y-4">
        <Skeleton className="rounded-lg">
          <div className="h-6 rounded-lg bg-default-300"></div>
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="h-36 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </Card>
  );
}

export default NoteCellSkeleton;
