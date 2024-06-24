function WidgetTags() {
  const tags = [
    "c",
    "css",
    "express",
    "firebase",
    "html",
    "mongodb",
    "nodejs",
    "php",
    "laravel",
    "postgreSql",
    "sql",
    "java",
    "reactjs",
  ];

  return (
    <div className="widget-tags">
      <h3>Watched Tags</h3>
      <div className="widget-tags-div">
        {tags.map((tag) => (
          <p key={tag}>{tag}</p>
        ))}
      </div>
    </div>
  );
}

export default WidgetTags;
