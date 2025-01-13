import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { query } from "../../../utils/query";
import ZborCard from "./ZborCard";

const ZboruriPage = () => {
  const [queryParameters, setQueryParameters] = useState({
    destination: { id: 0, denumire: "" },
    departureCity: { id: 0, denumire: "" },
    date: new Date(),
  });

  const { data, isLoading, isRefetching, error } = useQuery({
    queryKey: ["ZboruriPage", queryParameters],
    queryFn: () =>
      query(
        "api/cautareZboruri",
        {
          ...queryParameters,
          tip: "zboruri",
        },
        "POST"
      ),
  });

  return (
    <div className="container mt-4">
      <h1 className="text-center">Zboruri</h1>

      {!isLoading && !isRefetching ? (
        <div className="row">
          {data?.map((zbor, index) => (
            <ZborCard key={index} zbor={zbor} />
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ZboruriPage;