import './AddGigForm.css';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as gigActions from '../../store/gig';

export default function AddGigForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector((state) => state.session.user)
    const gigs = useSelector((state) => state.gig);
    const categories = useSelector((state) => state.category.categoriesByCategoryId)

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(1);
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [deliveryTimeline, setDeliveryTimeline] = useState('');
    const [returnTimeline, setReturnTimeline] = useState('');
    const [addErrors, setAddErrors] = useState([])

    const categoriesList = []
    Object.values(categories).forEach(category => {
        categoriesList.push(category)
    })

    useEffect(() => {
        dispatch(gigActions.getAllGigsThunk())
    }, [dispatch])

    // console.log(categoriesList)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setAddErrors([])

        const formData = {
            ownerId: currentUser.id,
            categoryId: parseInt(category),
            title: title,
            image: imageUrl,
            description: description,
            price: parseInt(price),
            deliveryTimeline: parseInt(deliveryTimeline),
            returnTimeline: parseInt(returnTimeline)
        }

        try {
            const data = dispatch(gigActions.addNewGigThunk(formData));
            if (data) {
                data.then(res => history.push(`/gigs/${res.id}`))
            } else {
                setAddErrors(data.errors);
                return;
            }
        } catch (errorResponse) {
            setAddErrors(['Something went wrong, please try again.']);
            console.log('Failed Request: ', errorResponse)
        };
    };

    const handleCancel = (e) => {
        e.preventDefault()
        return history.goBack()
    }
    
    if (!currentUser || !gigs) {
        return null
    }

    return (
        <>
            <form className='add-gig-form' onSubmit={handleSubmit}>
                <h1 className='add-gig-header'>This is the Create a Gig Form!</h1>
                {addErrors?.length > 0 && (
                    <div className='resource-error-container'>
                        {addErrors?.map((error, idx) => (
                            <p className='resource-error-message' key={idx}>
                                {error?.split(': ')[1]}
                            </p>
                        ))}
                    </div>
                )}

                <div className='input-field-div'>
                    <label className='label-for-input-field'>Title</label>
                    <input
                        className='input-field'
                        type='text'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        placeholder='Title'
                        required
                    />
                </div>
                <div className='input-field-div'>
                    <label className='label-for-input-field'>Category</label>
                    <select 
                    className='input-field'
                    onChange={(e) => setCategory(e.target.value)}
                    >
                        {categoriesList.map((category, i) => (
                            <option key={i} value={category.id}>
                                {`${category.name}`}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='input-field-div'>
                    <label className='label-for-input-field'>Image URL</label>
                    <input
                        className='input-field'
                        type='text'
                        onChange={(e) => setImageUrl(e.target.value)}
                        value={imageUrl}
                        placeholder='Image URL'
                        required
                    />
                </div>
                <div className='input-field-div'>
                    <label className='label-for-input-field'>Description</label>
                    <textarea 
                        className='input-field'
                        type='text'
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        placeholder='Description'
                        rows={5}
                    /> 
                </div>
                <div className='input-field-div'>
                    <label className='label-for-input-field'>Price</label>
                    <input 
                        className='input-field'
                        type='number'
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        placeholder='Price'
                        required
                    />
                </div>
                <div className='input-field-div'>
                    <label className='label-for-input-field'>Delivery Timeline</label>
                    <input 
                        className='input-field'
                        type='number'
                        onChange={(e) => setDeliveryTimeline(e.target.value)}
                        value={deliveryTimeline}
                        placeholder='Expected delivery timeline?'
                        required
                    />
                </div>
                <div className='input-field-div'>
                    <label className='label-for-input-field'>Cancellation Timeline</label>
                    <input 
                        className='input-field'
                        type='number'
                        onChange={(e) => setReturnTimeline(e.target.value)}
                        value={returnTimeline}
                        placeholder='Order cancellation timeline?'
                        required
                    />
                </div>

                <div>
                    <button
                        className='cancel-btn'
                        type='button'
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
                <div>
                    <button
                        className='submit-btn'
                        type='submit'
                    >
                        Submit
                    </button>
                </div>
            </form>
        </>
    )
}