import React, { useState } from "react";
import './DataCreateFile.css'

// const DataRoom = () =>
const DataCreateFile = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Uploaded data:", formData); // Replace with your upload logic
  };

  return (
    <div className="create-file">
      <h2>자료 업로드</h2>
      <p>새로운 자료를 업로드하려면 아래 정보를 입력하세요.</p>
      <form onSubmit={handleSubmit}>
        <label>
          제목:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          설명:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          파일 업로드:
          <input type="file" name="file" onChange={handleFileChange} />
        </label>
        <button type="submit">업로드</button>
      </form>
    </div>
  );
}

export default DataCreateFile;