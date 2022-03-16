import { useState } from 'react';
function sanitize(type, value) {
    switch (type) {
      case 'number':
        return Number(value) || 0;
  
      default:
        return value;
    }
  }

function FoodForm() {
    // const [title, setTitle] = useState('');
    // const [calorie, setCalorie] = useState(0);
    // const [content, setContent] = useState('');
    
    const [ values, setValues ] = useState({
        title: '',
        calorie: 0,
        content: '',
    });

    const handleSubmit = (e) => {
        e.preventDafualt();
        console.log(values);
    }
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setValues((preValues) => ({
            ...preValues,            
            [name]: sanitize(type, value),
        }));
    }
    // const handleTitleChange = (e) => {
    //     setTitle(e.target.values);
    // }

    // const handleRatingChange = (e) => {
    //     const nextCalorie = Number(e.target.values) || 0;
    //     setCalorie(nextCalorie);
    // };
    
    // const handleContentChange = (e) => {
    //     setContent(e.target.values);
    // };
    
    
    return (
        <form onSubmit={handleSubmit}>
            <input name="title" value={values.title} onChange={handleChange}></input>
            <input type="number" name="calorie" value={values.calorie} onChange={handleChange}></input>
            <input name="content" value={values.content} onChange={handleChange}></input>
            <button type='submit'> 확인 </button>
        </form>
    );
}

export default FoodForm;
