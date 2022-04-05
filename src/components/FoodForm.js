import { useState } from 'react';
import { createFood } from '../api';
import FileInput from './FileInput';


// function sanitize(type, value) {
//     switch (type) {
//       case 'number':
//         return Number(value) || 0;
  
//       default:
//         return value;
//     }
// }
const INITIAL_VALUES = {
    imgFile: null,
    title: '',
    calorie: 0,
    content: '',
}
  // 검색 기능 창을 만드는 FoodForm component 
function FoodForm({ onSubmitSuccess }) {
    const [isSubmitting, setIsSubmitting] = useState(false) // 서버에 POST 할 때 여러 번 눌리지 않게 하는 state 
    const [submittingError, setSubmittingError] = useState(null) // error 발생 시 처리할 state 
    // 이렇게 여러 개의 state 를 정의 하는 대신에
    // const [title, setTitle] = useState(''); 
    // const [calorie, setCalorie] = useState(0);
    // const [content, setContent] = useState('');    
    const [ values, setValues ] = useState(INITIAL_VALUES);
    
    // 제출 시의 브라우저 제어를 만아주는 이벤트 핸들러 preventDefault
    const handleChange = (name, value) => {
        
        // file 을 추가하기 위한 code 
        setValues((preValues) => ({
            ...preValues,
            [name]: value,
        }))
        // setValues((preValues) => ({
        //     ...preValues,
        //     [name]: sanitize(type, value),
        // }));
    };
    // const handleTitleChange = (e) => {
    //     setTitle(e.target.values);
    // }

    // const handleRatingChange = (e) => {
    //     const nextCalorie = Number(e.target.values) || 0;
    //     setCalorie(nextCalorie);
    // };
    
    // const handleContentChange = (e) => {
    //     setContent(e.target.values);
    // // };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleChange(name, value);
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('imgFile', values.imgFile);
        formdata.append('title', values.title);
        formdata.append('colorie', values.calorie);
        formdata.append('content', values.content);
        
        let result;
        try {
            setSubmittingError(null);
            setIsSubmitting(true);
            result = await createFood(formdata)
        } catch (error) {
            setSubmittingError(error);
            return;
        } finally {
            setIsSubmitting(false);
        }
        const { review } = result;
        onSubmitSuccess(review);
        setValues(INITIAL_VALUES)
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <FileInput 
                name="imgFile"
                value={values.imgFile}
                onChange={handleChange}
            />
            <input name="title" value={values.title} onChange={handleInputChange}></input>
            <input type="number" name="calorie" value={values.calorie} onChange={handleInputChange}></input>
            <input name="content" value={values.content} onChange={handleInputChange}></input>
            <button type='submit' disabled={isSubmitting}> 확인 </button>
            {submittingError?.messege && <div>{submittingError.messege}</div>}
        </form>
    );
}

export default FoodForm;