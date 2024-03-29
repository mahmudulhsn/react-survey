import PageComponent from "../components/PageComponent";
import SurveyListItem from "../components/surveys/SurveyListItem";
import { useStateContext } from "../contexts/ContextProvider";
import TButton from "../components/core/TButton";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axiosClient from "../axios";
import Pagination from "../components/Pagination";

const Surveys = () => {
  const { showToast } = useStateContext();
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({});

  const onDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this survey?")) {
      axiosClient
        .delete(`/surveys/${id}`)
        .then((res) => {
          getSurveys();
          showToast("You have successfully deleted the survey.");
        })
        .catch((err) => console.log(err));
    }
  };

  const onPageClick = (link) => {
    getSurveys(link.url);
  };

  const getSurveys = (url) => {
    url = url || "/surveys";
    setLoading(true);
    axiosClient.get(url).then(({ data }) => {
      setSurveys(data.data);
      setMeta(data.meta);
      setLoading(false);
    });
  };

  useEffect(() => {
    getSurveys();
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
      {loading && <div className="text-center text-lg">Loading...</div>}

      {!loading && (
        <div>
          {surveys.length === 0 && (
            <div className="py-8 text-center text-gray-700">
              You don't have surveys created.
            </div>
          )}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {surveys.map((survey) => (
              <SurveyListItem
                survey={survey}
                key={survey.id}
                onDeleteClick={onDeleteClick}
              />
            ))}
          </div>
          {surveys.length > 0 && (
            <Pagination meta={meta} onPageClick={onPageClick} />
          )}
        </div>
      )}
    </PageComponent>
  );
};

export default Surveys;
