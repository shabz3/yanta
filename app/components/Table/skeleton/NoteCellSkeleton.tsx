import React from "react";
import { Card, Skeleton, CardHeader, CardBody } from "@nextui-org/react";

function NoteCellSkeleton({ number }: { number: number }) {
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
      </div>
    ));
}

export default NoteCellSkeleton;
