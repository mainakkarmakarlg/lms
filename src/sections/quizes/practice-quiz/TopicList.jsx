import TopicItem from "./TopicItem";
export default function TopicList({ topics, subjectId, type }) {
  return (
    <div
      className={`w-full bg-[#F0F8FF] rounded-md  ${!type ? " px-2 xl:px-4" : "px-2"}`}
    >
      {topics?.map(
        (topic, index) =>
          topic?.questionCount > 0 && (
            <TopicItem
              key={topic.id}
              topic={topic}
              subjectId={subjectId}
              index={index}
              type={type}
            />
          )
      )}
    </div>
  );
}
