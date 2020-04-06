import React from "react";

interface IState {
  imageData: string[];
}

class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      imageData: [],
    };
  }

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files === null) {
      return;
    }

    if (files.length < 0) {
      return;
    }

    var file = files[0];
    for 
    var reader = new FileReader();
    reader.onload = (event: Event) => {
      const result: string | ArrayBuffer | null = (event.target as FileReader)
        .result;

      if (typeof result !== "string") {
        return;
      }

      //this.setState({ imageData: result });
      this.state.imageData.push(result);
    };
    reader.readAsDataURL(file);

  };
  render() {
    const imageData = this.state.imageData;
    let preview: JSX.Element = <></>;

    if (imageData != null && typeof imageData === "string") {
      preview = (
        <div>
          <img src={imageData} />
        </div>
      );
    }

    return (
      <>
        <input type="file" onChange={this.onChange} multiple></input>
        {preview}
      </>
    );
  }
}

export default App;
