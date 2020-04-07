import React from "react";

interface IState {
  imageUrls: string[];
  value: number;
}

class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      imageUrls: [],
      value: 0,
    };
  }

  onChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const files = event.target.files;
    if (files === null) {
      return;
    }

    if (files.length < 0) {
      return;
    }

    for (const file of Array.from(files)) {
      const result = await this.readFile(file);
      this.state.imageUrls.push(result);
    }

    this.setState({ imageUrls: this.state.imageUrls });
  };

  readFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      var fr = new FileReader();
      fr.onload = (event: Event) => {
        const result: string | ArrayBuffer | null = (event.target as FileReader)
          .result;
        if (typeof result === "string") {
          resolve(result);
        }
      };
      fr.readAsDataURL(file);
    });
  };

  reset = (): void => {
    this.setState({ value: Math.random() });
    this.setState({ imageUrls: [] });
  };

  preview = (imageUrl: string): JSX.Element => {
    return <img src={imageUrl} alt="preview" style={{ width: "25%" }} />;
  };

  render() {
    return (
      <>
        <input
          type="file"
          multiple
          onChange={this.onChange}
          key={this.state.value}
        ></input>
        <input type="button" value="reset" onClick={this.reset}></input>
        <div>
          {this.state.imageUrls.map((imageUrl) => {
            return this.preview(imageUrl);
          })}
        </div>
      </>
    );
  }
}

export default App;
