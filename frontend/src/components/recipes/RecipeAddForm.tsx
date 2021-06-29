import React, { ChangeEvent, FormEvent, useState } from "react";
import { useAppSelector } from "../../state/hooks";
import AddIcon from "../../../public/add.svg";
import MinusIcon from "../../../public/minus.svg";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

const RecipeAddForm = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [""],
    steps: [""],
  });
  const [ingredientCount, setIngredientCount] = useState(1);
  const [stepCount, setStepCount] = useState(1);
  const [files, setFiles] = useState("");
  const history = useHistory();

  const token = useAppSelector((state) => state.auth.data.token);

  const alert = useAlert();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      // @ts-ignore
      data.append("files", files.item(i));
    }

    data.append("recipe", JSON.stringify(recipe));
    data.append("token", token);

    fetch("http://localhost:5000/api/recipes/add", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          alert.success("Recipe successfully added!");
          history.push("/profile");
        } else {
          alert.error(json.message);
        }
      });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    let index;
    let fieldName = e.target.name;
    if (fieldName.includes("ingredients") || fieldName.includes("steps")) {
      index = fieldName.substring(
        fieldName.indexOf("[") + 1,
        fieldName.indexOf("]")
      );

      fieldName = fieldName.substring(0, fieldName.indexOf("["));
      // @ts-ignore
      let arr = recipe[fieldName];
      arr[index] = e.target.value;

      setRecipe({
        ...recipe,
        [fieldName]: arr,
      });
    } else {
      setRecipe({
        ...recipe,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleFileChange = (e: any) => {
    setFiles(e.target.files);
  };

  return (
    <div>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
          value={recipe.name}
          required
        />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          onChange={handleChange}
          value={recipe.description}
          required
        ></textarea>
        <label htmlFor="ingredients[]">Ingredients</label>
        {[...Array(ingredientCount)].map((i, ind) => (
          <input
            type="text"
            name={`ingredients[${ind}]`}
            key={ind}
            onChange={handleChange}
            value={recipe.ingredients[ind]}
            required
          />
        ))}
        <div className="center">
          <img
            src={AddIcon.toString()}
            alt="Add ingredient"
            height="20px"
            className="pointer mr-5"
            onClick={() => {
              let arr = [...recipe.ingredients];
              arr.push("");
              setRecipe({
                ...recipe,
                ingredients: arr,
              });
              setIngredientCount(ingredientCount + 1);
            }}
          />
          <img
            src={MinusIcon.toString()}
            alt="Remove ingredient"
            height="20px"
            className="pointer"
            onClick={() => {
              if (ingredientCount > 1) {
                let arr = [...recipe.ingredients];
                arr.pop();
                setRecipe({
                  ...recipe,
                  ingredients: arr,
                });
              }
              setIngredientCount(ingredientCount > 1 ? ingredientCount - 1 : 1);
            }}
          />
        </div>
        <label htmlFor="steps[]">Steps to make</label>
        {[...Array(stepCount)].map((i, ind) => (
          <textarea
            name={`steps[${ind}]`}
            key={ind}
            onChange={handleChange}
            value={recipe.steps[ind]}
            required
          ></textarea>
        ))}
        <div className="center">
          <img
            src={AddIcon.toString()}
            alt="Add step"
            height="20px"
            className="pointer mr-5"
            onClick={() => {
              let arr = [...recipe.steps];
              arr.push("");
              setRecipe({
                ...recipe,
                steps: arr,
              });
              setStepCount(stepCount + 1);
            }}
          />
          <img
            src={MinusIcon.toString()}
            alt="Remove step"
            height="20px"
            className="pointer"
            onClick={() => {
              if (stepCount > 1) {
                let arr = [...recipe.steps];
                arr.pop();
                setRecipe({
                  ...recipe,
                  steps: arr,
                });
              }
              setStepCount(stepCount > 1 ? stepCount - 1 : 1);
            }}
          />
        </div>
        <label htmlFor="images">Images</label>
        <input
          type="file"
          name="files[]"
          id="fileInput"
          onChange={handleFileChange}
          multiple
          required
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default RecipeAddForm;
