import PageComponent from "../components/PageComponent";
import SurveyListItem from "../components/surveys/SurveyListItem";
import { useStateContext } from "../contexts/ContextProvider";
import TButton from "../components/core/TButton";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axiosClient from "../axios";
import Pagination from "../components/Pagination";

const Surveys = () => {
  // const { surveys } = useStateContext();
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(false);

  const onDeleteClick = () => {
    console.log("onDeleteClick");
  };

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get("/surveys")
      .then(({ data }) => {
        setSurveys(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <PageComponent
      title="Surveys"
      button={
        <TButton color="green" to="/surveys/create">
          <PlusCircleIcon className="h-6 w-6 mr-2" /> Create new
        </TButton>
      }
    >
      {loading && <div className="text-center">Loading...</div>}

      {!loading && (
        <div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {surveys.map((survey) => (
              <SurveyListItem
                survey={survey}
                key={survey.id}
                onDeleteClick={onDeleteClick}
              />
            ))}
          </div>
          <Pagination />
        </div>
      )}
    </PageComponent>
  );
};

export default Surveys;
