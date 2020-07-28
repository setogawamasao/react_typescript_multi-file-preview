import React from "react";
import Icon from "./times-circle.svg";

interface IState {
  imageUrls: string[];
  resetKey: number;
}

class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      imageUrls: [],
      resetKey: 0,
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
    this.setState({ resetKey: Math.random() });
    this.setState({ imageUrls: [] });
  };

  deleteImage = (id: number) => {
    this.state.imageUrls.splice(id, 1);
    this.setState({ imageUrls: this.state.imageUrls });
  };

  preview = (imageUrl: string, id: number): JSX.Element => {
    return (
      <div className="preview">
        <img src={imageUrl} alt="preview" style={{ width: "100%" }} />
        <img
          src={Icon}
          className="delete-button"
          onClick={() => this.deleteImage(id)}
        />
      </div>
    );
  };

  render() {
    return (
      <>
        <input
          type="file"
          multiple
          onChange={this.onChange}
          key={this.state.resetKey}
        ></input>
        <input type="button" value="reset" onClick={this.reset}></input>
        <div>
          {this.state.imageUrls.map((imageUrl, id) => {
            return this.preview(imageUrl, id);
          })}
        </div>
      </>
    );
  }
}

export default App;
