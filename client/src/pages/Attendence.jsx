import React, { useState, useEffect, useCallback } from "react";
import { dummyAttendanceData } from "../assets/assets";
import Loading from "../components/Loading";
import { Check } from "lucide-react";
import CheckingButton from "../components/atttendence/CheckingButton";
import AttendenceStats from "../components/atttendence/AttendenceStats";
import AttendenceHistory from "../components/atttendence/AttendenceHistory";

const Attendence = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);

  const fetchData = useCallback(async () => {
    setHistory(dummyAttendanceData);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  if (loading) return <Loading />;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayRecord = history.find(
    (record) => new Date(record.date).toDateString() === today.toDateString(),
  );

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div className="page-title">
          <h1 className="page-title">Attendance </h1>
          <p className="page-subtitle">
            Track your work hours and daily check-ins
          </p>
        </div>
      </div>
      {isDeleted ? (
        <div className="mb-8 pb-6 bg-rose-300 rounded-2xl text-center">
          <p className="text-rose-800">
            You can longer clock in or out because your emmployee records have
            been marked as deleted
          </p>
        </div>
      ) : (
        <div className="mb-8">
          <CheckingButton todayRecord={todayRecord} onAction={fetchData} />
        </div>
      )}
      <AttendenceStats history={history} />
      <AttendenceHistory history={history} />
    </div>
  );
};

export default Attendence;
