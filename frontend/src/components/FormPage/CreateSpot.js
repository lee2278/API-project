import SpotForm from "./SpotForm"

export default function CreateSpot() {
    const spot = {
        address:'',
        city: '',
        state: '',
        country: '',
        lat: '',
        lng: '',
        name: '',
        description: '',
        price: ''
    }

    return (
        <SpotForm spot={spot} formType="Create Spot"/>
    )
}
