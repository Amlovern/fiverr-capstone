import './UpdateGigForm.css';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import * as gigActions from '../../store/gig';

export default function UpdateGigForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const currentUser = useSelector((state) => state.session.user);
    const gigs = useSelector((state) => state.gig);
    const categories = useSelector((state) => state.category.categoriesByCategoryId);

    const gigId = params.gigId;
    const currentGig = gigs.gigsByGigId[gigId]

    const [title, setTitle] = useState(currentGig?.title);
    const [category, setCategory] = useState(currentGig?.categoryId);
    const [imageUrl, setImageUrl] = useState(currentGig?.image);
    const [description, setDescription] = useState(currentGig?.description);
    const [price, setPrice] = useState(currentGig?.price);
    const [deliveryTimeline, setDeliveryTimeline] = useState(currentGig?.deliveryTimeline);
    const [returnTimeline, setReturnTimeline] = useState(currentGig?.returnTimeline);
    const [updateErrors, setUpdateErrors] = useState([])

    const categoriesList = []
    Object.values(categories).forEach(category => {
        categoriesList.push(category)
    })

    useEffect(() => {
        dispatch(gigActions.getAllGigsThunk())
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setUpdateErrors([]);

        const formData = {
            ownerId: currentUser.id,
            category: parseInt(category),
            title: title,
            image: imageUrl,
            description: description,
            price: parseInt(price),
            deliveryTimeline: parseInt(deliveryTimeline),
            returnTimeline: parseInt(returnTimeline)
        }

        try {
            const data = dispatch(gigActions.updateOneGigThunk(currentGig, formData));
            if (data) {
                data.then(res => history.push(`/gigs/${res.id}`))
            } else {
                setUpdateErrors(data.errors)
                return;
            }
        } catch (errorResponse) {
            setUpdateErrors(['Something went wrong, please try again.'])
            console.log('Failed Request: ', errorResponse)
        };
    };

    const handleCancel = (e) => {
        e.preventDefault();
        return history.goBack();
    }

    if (!currentUser || !gigs) {
        return null
    }

    return (
        <div className='update-gig-form-page'>
            <form className='update-gig-form' onSubmit={handleSubmit}>
                <h1 className='update-gig-header'>This is the Update Gig Form!</h1>
                {updateErrors?.length > 0 && (
                    <div className='resource-error-container'>
                        {updateErrors?.map((error, idx) => (
                            <p className='resource-error-message' key={idx}>
                                {error?.split(': ')[1]}
                            </p>
                        ))}
                    </div>
                )}

                <div className='input-wrapper'>
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
                <div className='input-wrapper'>
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
                <div className='input-wrapper'>
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
                <div className='input-wrapper'>
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
                <div className='input-wrapper'>
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
                <div className='input-wrapper'>
                    <label className='label-for-input-field'>Delivery Timeline</label>
                    <input 
                        className='input-field'
                        type='number'
                        onChange={(e) => setDeliveryTimeline(e.target.value)}
                        value={deliveryTimeline}
                        placeholder='Expected delivery timeline? (In days)'
                        required
                    />
                </div>
                <div className='input-wrapper'>
                    <label className='label-for-input-field'>Cancellation Timeline</label>
                    <input 
                        className='input-field'
                        type='number'
                        onChange={(e) => setReturnTimeline(e.target.value)}
                        value={returnTimeline}
                        placeholder='Order cancellation timeline? (In days)'
                        required
                    />
                </div>

                <div className='update-gig-btn-container'>
                    <button
                        className='update-gig-btn'
                        type='button'
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
                <div className='update-gig-btn-container'>
                    <button
                        className='update-gig-btn'
                        type='submit'
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
};