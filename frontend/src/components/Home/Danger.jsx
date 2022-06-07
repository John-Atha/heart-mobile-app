import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getAverages, postToModel } from "../../api/neural";
import { queriesKeys } from "../../api/queriesKeys";
import { selectAuth } from "../../redux/slices/authSlice";
import { DangerCard } from "../Danger/DangerCard";
import { Spinner } from "../Global/Spinner";

const defaultDangerObject = {
  percentage: 0,
  danger_class: 0,
};

export const Danger = () => {
  const { user } = useSelector(selectAuth);
  const { data, isLoading } = useQuery(
    [queriesKeys["getAverages"], user?.id],
    () => getAverages(user?.id),
    {
      enabled: !!user?.id,
      refetchOnWindowFocus: false,
      cacheTime: 0,
    }
  );

  const [danger, setDanger] = useState(defaultDangerObject);
  const [dangerLoading, setDangerLoading] = useState(false);

  useEffect(() => {
    if (data && !isLoading) {
      setDangerLoading(true);
      postToModel(data)
        .then((response) => {
          console.log(response.data);
          const { percentage, class: danger_class } = response.data;
          setDanger({
            percentage: percentage || 0,
            danger_class: danger_class || 0,
          });
          setDangerLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setDanger(defaultDangerObject);
          setDangerLoading(false);
        });
    }
  }, [data, isLoading]);

  if (dangerLoading) {
    return <Spinner />;
  }
  return <DangerCard {...danger} />;
};
