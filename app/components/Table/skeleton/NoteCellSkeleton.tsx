"use client";

import { Card, Skeleton, CardHeader, CardBody } from "@nextui-org/react";

function NoteCellSkeleton({ number }: { number: number | undefined }) {
  return Array(number)
    .fill(0)
    .map((e, index) => (
      <div key={index} className="mb-5 pt-4">
        <Card className="align-middle p-5 pt-7 mx-10">
          <Skeleton className="mb-11 rounded-lg w-full text-center py-2 h-12  flex-col">
            <div className="" />
          </Skeleton>
          <Skeleton className="pt-4 rounded-lg block h-32 overflow-hidden ">
            <div className="" />
          </Skeleton>
        </Card>
        <div className="flex justify-center mt-5">
        <Skeleton className="rounded-lg h-5 w-2/5">
          <div className="h-5 w-2/5 rounded-lg bg-default-200"></div>
        </Skeleton></div>
      </div>
    ));
}

export default NoteCellSkeleton;
