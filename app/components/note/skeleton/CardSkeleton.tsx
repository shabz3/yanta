"use client"

import { Button, Card, Skeleton } from "@nextui-org/react";

function CardSkeleton() {
  return (
    <Card className="mt-20 mx-14 p-4" radius="lg">
      <div className="space-y-20">
        <Skeleton className="rounded-lg  mx-4 mt-4">
          <div className="h-14 block w-full"></div>
        </Skeleton>
        <Skeleton className="rounded-lg px-4 mx-4">
          <div className="h-56 block w-full"></div>
        </Skeleton>
      </div>
      <div className="">
        <Skeleton className="rounded-lg mx-4 mt-12 mb-4">
          <div className="h-10 block w-full"></div>
        </Skeleton>
      </div>
    </Card>
  );
}

export default CardSkeleton;
