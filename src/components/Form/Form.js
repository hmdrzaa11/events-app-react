import React, { useContext, useEffect, useState } from "react";
import Input from "../Input/Input";
import { dispatchContext, PostsContext } from "../../context/PostsContext";
import { createPost, resetErrorAction } from "../../actions/postsActions";
import "./Form.css";
import Notification from "../Notification/Notification";

function Form(props) {
  let dispatch = useContext(dispatchContext);
  let { error, loading } = useContext(PostsContext);
  //******************** form state ********************** */
  let [formState, setFormState] = useState({
    title: "",
    content: "",
    tags: "",
  });
  let [image, setImage] = useState(null);
  let { post, onFormSubmit } = props;

  //********** set default value for inputs *********** */
  useEffect(() => {
    if (post) {
      setFormState({
        title: post.title,
        content: post.content,
        tags: post.tags.join(","),
      });
    }
  }, [post]);
  //********************* form submit ****************************** */
  let handleFormSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("image", image);
    formData.append("title", formState.title);
    formData.append("tags", formState.tags);
    formData.append("content", formState.content);

    //call the actionCreator
    if (onFormSubmit) {
      onFormSubmit(formData, setFormState);
    } else {
      createPost(dispatch, formData, props.history);
      setFormState({
        tags: "",
        title: "",
        content: "",
      });
    }
  };
  //******************* input change handler ********************* */
  let handleInputChange = (e) => {
    setFormState((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
  };

  //***************************** close notification ********************************** */
  let onNotificationClose = () => {
    resetErrorAction(dispatch);
  };

  //********************** render Errors ****************************** */

  let renderErrors = () => {
    if (error) {
      return (
        <Notification
          message={error.error}
          status="Failed"
          onNotificationClose={onNotificationClose}
        />
      );
    }
  };

  //********************* render *************************** */ */
  return (
    <div className="Form" onSubmit={handleFormSubmit}>
      {renderErrors()}
      <h1 className="Form-header">
        {onFormSubmit ? "Update" : "Create"} an Event
      </h1>
      <form autoComplete="off" className="Form-form">
        <Input
          type="text"
          label="Title"
          name="title"
          value={formState.title}
          onChange={handleInputChange}
          placeholder="Title"
        />
        <Input
          type="text"
          label="Content"
          name="content"
          value={formState.content}
          onChange={handleInputChange}
          placeholder="Content"
        />
        <Input
          type="text"
          label="Tags"
          name="tags"
          value={formState.tags}
          onChange={handleInputChange}
          placeholder="Tags : comma separated"
        />
        <Input
          type="file"
          label="Image"
          name="image"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <div className="Form-submit-wrapper">
          <button className="submit">
            {onFormSubmit ? "Update" : "Create"} an event
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
