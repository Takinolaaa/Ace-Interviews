async function getQuestions() {
  try {
    const response = await fetch("http://localhost:8080/api/questions", {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("An error has occurred:", error);
  }
}

async function getAudio() {
  try {
    const response = await fetch("http://localhost:8080/api/audio", {
      method: "GET",
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log("An error has occurred:", error);
  }
}

export { getQuestions, getAudio };
