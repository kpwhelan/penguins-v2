import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import PrimaryButton from "./PrimaryButton";
import { useState } from "react";
import Modal from "./Modal";

export default function SwimmerBioCard({ bio }) {
    const [displaySwimmerBioModal, setDisplaySwimmerBioModal] = useState(false);

    const toggleSetDisplaySwimmerBioModal = () => {
        setDisplaySwimmerBioModal(displaySwimmerBioModal ? false : true);
    }

    return (
        <>
            {displaySwimmerBioModal &&
                <Modal show={displaySwimmerBioModal}>
                    <Card key={bio.id} className="mt-6 w-full mx-auto pt-8">
                        <CardHeader color="blue-gray" className=" h-96">
                            <img
                            src={bio.image_cdn}
                            alt="card-image"
                            className="h-full w-full object-cover"
                            />
                        </CardHeader>
                        <CardBody>
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                {bio.swimmer_name}
                            </Typography>
                            <div>
                                <Typography>
                                    {bio.body}
                                </Typography>
                            </div>
                        </CardBody>
                        <CardFooter className="pt-0">
                            <PrimaryButton onClick={toggleSetDisplaySwimmerBioModal} className="float-end">Close</PrimaryButton>
                        </CardFooter>
                    </Card>
                </Modal>
            }
            <Card key={bio.id} className="mt-10 w-96">
                <CardHeader color="blue-gray" className=" h-56">
                    <img
                    src={bio.image_cdn}
                    alt="card-image"
                    className="h-full w-full object-cover"
                    />
                </CardHeader>
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        {bio.swimmer_name}
                    </Typography>
                    <div className="line-clamp-3">
                        <Typography>
                            {bio.body}
                        </Typography>
                    </div>
                </CardBody>
                <CardFooter className="pt-0">
                    <PrimaryButton onClick={toggleSetDisplaySwimmerBioModal} className=" float-end md:ml-[60%]">Read More</PrimaryButton>
                </CardFooter>
            </Card>
        </>
    );
}
