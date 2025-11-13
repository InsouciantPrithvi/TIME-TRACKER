import React, { useState, useEffect } from "react";

// --- Data from Daily_Study_Calendar.md ---
const studyPlan = [
  // Week 1
  {
    date: "Nov 13",
    day: "Thursday",
    task: "BEE (Lectures 1-4)",
    revision: "Per Weekday Plan",
  },
  {
    date: "Nov 14",
    day: "Friday",
    task: "BEE (Lectures 5-8)",
    revision: "Per Weekday Plan",
  },
  {
    date: "Nov 15",
    day: "Saturday",
    task: "BEE (Lectures 9-14)",
    revision: "Per Weekend Plan",
  },
  {
    date: "Nov 16",
    day: "Sunday",
    task: "BEE (Lectures 15-20)",
    revision: "Per Weekend Plan",
  },
  {
    date: "Nov 17",
    day: "Monday",
    task: "BEE (Lectures 21-24)",
    revision: "Per Weekday Plan",
  },
  {
    date: "Nov 18",
    day: "Tuesday",
    task: "BEE (Lectures 25-28) (BEE Complete!)",
    revision: "Per Weekday Plan",
  },
  {
    date: "Nov 19",
    day: "Wednesday",
    task: "EDC & LIC (Lectures 1-4)",
    revision: "Per Weekday Plan",
  },
  // Week 2
  {
    date: "Nov 20",
    day: "Thursday",
    task: "EDC & LIC (Lectures 5-8)",
    revision: "Per Weekday Plan",
  },
  {
    date: "Nov 21",
    day: "Friday",
    task: "EDC & LIC (Lectures 9-12)",
    revision: "Per Weekday Plan",
  },
  {
    date: "Nov 22",
    day: "Saturday",
    task: "EDC & LIC (Lectures 13-18)",
    revision: "Per Weekend Plan",
  },
  {
    date: "Nov 23",
    day: "Sunday",
    task: "EDC & LIC (19-20) (Complete!) <br> Digital Electronics (1-4)",
    revision: "Per Weekend Plan",
  },
  {
    date: "Nov 24",
    day: "Monday",
    task: "Digital Electronics (5-8)",
    revision: "Per Weekday Plan",
  },
  {
    date: "Nov 25",
    day: "Tuesday",
    task: "Digital Electronics (9-12)",
    revision: "Per Weekday Plan",
  },
  {
    date: "Nov 26",
    day: "Wednesday",
    task: "Digital Electronics (13-16)",
    revision: "Per Weekday Plan",
  },
  // Week 3
  {
    date: "Nov 27",
    day: "Thursday",
    task: "Digital Electronics (17-20)",
    revision: "Per Weekday Plan",
  },
  {
    date: "Nov 28",
    day: "Friday",
    task: "Digital Electronics (21) (Complete!) <br> MP & MC (1-3)",
    revision: "Per Weekday Plan",
  },
  {
    date: "Nov 29",
    day: "Saturday",
    task: "MP & MC (4-9)",
    revision: "Per Weekend Plan",
  },
  {
    date: "Nov 30",
    day: "Sunday",
    task: "MP & MC (10-15)",
    revision: "Per Weekend Plan",
  },
  {
    date: "Dec 1",
    day: "Monday",
    task: "MP & MC (16-17) (Complete!) <br> Computer Prog. (1-2)",
    revision: "Per Weekday Plan",
  },
  {
    date: "Dec 2",
    day: "Tuesday",
    task: "Computer Prog. (3-6)",
    revision: "Per Weekday Plan",
  },
  {
    date: "Dec 3",
    day: "Wednesday",
    task: "Computer Prog. (7-10)",
    revision: "Per Weekday Plan",
  },
  // Week 4
  {
    date: "Dec 4",
    day: "Thursday",
    task: "Computer Prog. (11-13) (Complete!) <br> Elec. Measurements (1)",
    revision: "Per Weekday Plan",
  },
  {
    date: "Dec 5",
    day: "Friday",
    task: "Elec. Measurements (2-5)",
    revision: "Per Weekday Plan",
  },
  {
    date: "Dec 6",
    day: "Saturday",
    task: "Elec. Measurements (6-11)",
    revision: "Per Weekend Plan",
  },
  {
    date: "Dec 7",
    day: "Sunday",
    task: "Elec. Measurements (12) (Complete!) <br> Data Comm. & Net. (1-5)",
    revision: "Per Weekend Plan",
  },
  {
    date: "Dec 8",
    day: "Monday",
    task: "Data Comm. & Net. (6-9) (Complete!)",
    revision: "Per Weekday Plan",
  },
  {
    date: "Dec 9",
    day: "Tuesday",
    task: "Elec. Material & Comp. (1-4)",
    revision: "Per Weekday Plan",
  },
  {
    date: "Dec 10",
    day: "Wednesday",
    task: "Elec. Material & Comp. (5-8)",
    revision: "Per Weekday Plan",
  },
  // Final Phase
  {
    date: "Dec 11",
    day: "Thursday",
    task: "Elec. Material & Comp. (9) (ALL COMPLETE!)",
    revision: "Full Day Revision",
  },
  {
    date: "Dec 12",
    day: "Friday",
    task: "Mock Tests & Analysis",
    revision: "Final Formula Review",
  },
  { date: "Dec 13", day: "Saturday", task: "EXAM DAY", revision: "Good Luck!" },
];

// --- State Management Key ---
const STORAGE_KEY = "dfccilStudyTrackerState";

/**
 * Reusable Checkbox component for hourly sub-tasks
 */
const SubtaskCheckbox = ({
  date,
  taskIdSuffix,
  time,
  description,
  completionState,
  onToggle,
}) => {
  const taskId = `${date}-${taskIdSuffix}`;
  const isCompleted = completionState[taskId] || false;

  return (
    <div className="flex items-start">
      <input
        id={`check-${taskId}`}
        type="checkbox"
        data-task-id={taskId}
        className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
        checked={isCompleted}
        onChange={() => onToggle(taskId)}
      />
      <label
        htmlFor={`check-${taskId}`}
        className={`ml-3 block text-sm cursor-pointer ${
          isCompleted ? "line-through opacity-60" : ""
        }`}
      >
        <span className="font-medium">{time}</span>
        <span className="text-gray-600"> {description}</span>
      </label>
    </div>
  );
};

/**
 * Component for "Today's Focus"
 */
const TodayFocus = ({ todayTask, completionState, onToggle }) => {
  if (!todayTask) {
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Today's Focus
        </h2>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-gray-700 font-medium">
            No task scheduled for today. Take a break or revise!
          </p>
        </div>
      </section>
    );
  }

  const { date, day, task, revision } = todayTask;
  const mainTaskId = `${date}-main`;
  const isMainCompleted = completionState[mainTaskId] || false;
  const isWeekend = day === "Saturday" || day === "Sunday";

  let hourlyPlan;
  if (date === "Dec 11" || date === "Dec 12") {
    hourlyPlan = (
      <ul className="list-disc list-inside space-y-2 text-gray-600">
        <li>
          <span className="font-medium">All Day:</span> Focus on your main task.
          Structure your day as you see fit.
        </li>
      </ul>
    );
  } else if (date === "Dec 13") {
    hourlyPlan = (
      <ul className="list-disc list-inside space-y-2 text-gray-600">
        <li>
          <span className="font-medium">All Day:</span> Stay calm, focused, and
          good luck!
        </li>
      </ul>
    );
  } else if (isWeekend) {
    hourlyPlan = (
      <ul className="space-y-3 text-gray-600">
        <SubtaskCheckbox
          date={date}
          taskIdSuffix="task1"
          time="7:30 AM - 10:30 AM:"
          description="2 Lectures (Deep Study)"
          completionState={completionState}
          onToggle={onToggle}
        />
        <SubtaskCheckbox
          date={date}
          taskIdSuffix="task2"
          time="10:30 AM - 11:30 AM:"
          description="1 hr Active Revision (morning)"
          completionState={completionState}
          onToggle={onToggle}
        />
        <SubtaskCheckbox
          date={date}
          taskIdSuffix="task3"
          time="1:00 PM - 4:00 PM:"
          description="2 Lectures (Deep Study)"
          completionState={completionState}
          onToggle={onToggle}
        />
        <SubtaskCheckbox
          date={date}
          taskIdSuffix="task4"
          time="4:00 PM - 5:00 PM:"
          description="1 hr Active Revision (afternoon)"
          completionState={completionState}
          onToggle={onToggle}
        />
        <SubtaskCheckbox
          date={date}
          taskIdSuffix="task5"
          time="7:00 PM - 10:00 PM:"
          description="2 Lectures (Deep Study)"
          completionState={completionState}
          onToggle={onToggle}
        />
        <SubtaskCheckbox
          date={date}
          taskIdSuffix="task6"
          time="10:00 PM - 11:30 PM:"
          description="1.5 hr Comprehensive Revision"
          completionState={completionState}
          onToggle={onToggle}
        />
      </ul>
    );
  } else {
    hourlyPlan = (
      <ul className="space-y-3 text-gray-600">
        <SubtaskCheckbox
          date={date}
          taskIdSuffix="task1"
          time="6:30 AM - 10:00 AM:"
          description="2-3 Lectures (Deep Study)"
          completionState={completionState}
          onToggle={onToggle}
        />
        <SubtaskCheckbox
          date={date}
          taskIdSuffix="task2"
          time="Work Break (1hr):"
          description="Active Revision (of morning)"
          completionState={completionState}
          onToggle={onToggle}
        />
        <SubtaskCheckbox
          date={date}
          taskIdSuffix="task3"
          time="8:00 PM - 11:30 PM:"
          description="1-2 Lectures + Daily Wrap-up"
          completionState={completionState}
          onToggle={onToggle}
        />
      </ul>
    );
  }

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Today's Focus
      </h2>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-start space-x-4">
          <input
            id={`check-${mainTaskId}`}
            type="checkbox"
            data-task-id={mainTaskId}
            className="h-6 w-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
            checked={isMainCompleted}
            onChange={() => onToggle(mainTaskId)}
          />
          <div className="flex-1">
            <label
              htmlFor={`check-${mainTaskId}`}
              className={`block cursor-pointer ${
                isMainCompleted ? "line-through opacity-60" : ""
              }`}
            >
              <span className="block text-sm font-medium text-blue-600">
                {day}, {date}
              </span>
              <span
                className="block text-xl font-semibold text-gray-900 mt-1"
                dangerouslySetInnerHTML={{ __html: task }}
              ></span>
              <span className="block text-md text-gray-500 mt-2">
                <b>Revision:</b> {revision}
              </span>
            </label>

            {/* Injected Hourly Plan */}
            <div className="mt-4 border-t border-gray-200 pt-4">
              <h4 className="text-md font-semibold text-gray-700 mt-2 mb-3">
                Your Hourly Plan:
              </h4>
              {hourlyPlan}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Component for a single task item in the full plan
 */
const TaskItem = ({ day, completionState, onToggle }) => {
  const mainTaskId = `${day.date}-main`;
  const isCompleted = completionState[mainTaskId] || false;

  return (
    <li className="p-4 hover:bg-gray-50">
      <div className="flex items-start space-x-3">
        <input
          id={`check-full-${mainTaskId}`}
          type="checkbox"
          data-task-id={mainTaskId}
          className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
          checked={isCompleted}
          onChange={() => onToggle(mainTaskId)}
        />
        <div className="flex-1">
          <label
            htmlFor={`check-full-${mainTaskId}`}
            className={`block cursor-pointer ${
              isCompleted ? "line-through opacity-60" : ""
            }`}
          >
            <span className="block text-sm font-medium text-gray-800">
              {day.day}, {day.date}
            </span>
            <span
              className="block text-gray-600"
              dangerouslySetInnerHTML={{ __html: day.task }}
            ></span>
          </label>
        </div>
      </div>
    </li>
  );
};

/**
 * Component for the "Full 28-Day Plan"
 */
const FullPlan = ({ studyPlan, completionState, onToggle }) => {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Full 28-Day Plan
      </h2>
      <div className="bg-white rounded-xl shadow-lg">
        <ul className="divide-y divide-gray-200">
          {studyPlan.map((day) => (
            <TaskItem
              key={day.date}
              day={day}
              completionState={completionState}
              onToggle={onToggle}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

/**
 * Main App Component
 */
export default function App() {
  // State to hold all checkbox states
  const [completionState, setCompletionState] = useState({});

  // Load state from localStorage on initial render
  useEffect(() => {
    const storedState = localStorage.getItem(STORAGE_KEY);
    if (storedState) {
      setCompletionState(JSON.parse(storedState));
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    // Only save if completionState is not empty (to avoid overwriting on first load)
    if (Object.keys(completionState).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completionState));
    }
  }, [completionState]);

  // Handle toggling any checkbox
  const handleToggle = (taskId) => {
    setCompletionState((prevState) => ({
      ...prevState,
      [taskId]: !prevState[taskId], // Toggle the boolean value
    }));
  };

  // --- Get Today's Task ---
  const getTodayString = () =>
    new Date().toLocaleString("en-US", { month: "short", day: "numeric" });

  // For LIVE use, uncomment the line below:
  // const todayString = getTodayString();

  // For TESTING (matches the user's current date of Nov 13)
  const todayString = "Nov 13"; // Change to "Nov 15" to test weekend view

  const todayTask = studyPlan.find((day) => day.date === todayString);
  // --- End of Today's Task Logic ---

  return (
    // Added min-h-screen to match original style
    <div className="bg-gray-100 p-4 sm:p-8 min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            DFCCIL S&T Study Tracker
          </h1>
          <p className="text-lg text-gray-600">
            Your 28-day guide to success. Good luck!
          </p>
        </header>

        {/* Today's Focus Section */}
        <TodayFocus
          todayTask={todayTask}
          completionState={completionState}
          onToggle={handleToggle}
        />

        {/* Full Study Calendar Section */}
        <FullPlan
          studyPlan={studyPlan}
          completionState={completionState}
          onToggle={handleToggle}
        />
      </div>
    </div>
  );
}
