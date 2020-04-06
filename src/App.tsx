import React from "react";

interface IState {
  imageData: string[];
  fileList: FileList | null;
}

class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      imageData: [],
      fileList: null,
    };
  }

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files === null) {
      return;
    }

    files.item;
    this.setState({ fileList: event.target.files });

    if (files.length < 0) {
      return;
    }

    var file = files[0];
    var reader = new FileReader();
    reader.onload = (event: Event) => {
      const result: string | ArrayBuffer | null = (event.target as FileReader)
        .result;

      if (typeof result !== "string") {
        return;
      }

      //this.setState({ imageData: result });
      this.state.imageData.push(result);
      this.setState({ imageData: this.state.imageData });
    };
    reader.readAsDataURL(file);
  };
  render() {
    const imageData = this.state.imageData[0];
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
