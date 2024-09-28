import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Image } from "@nextui-org/image"
import { format } from "date-fns"
import { IPost } from '../types';

const MyCard = ({ post }: { post: IPost }) => {
  const { title, category, location, images, city, dateFound, _id } = post || {};

  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{category.name}</p>
        <small className="text-default-500">{location} , {city}</small>
        <h4 className="font-bold text-large">{title}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        {
          images?.map((url: string, i: number) => <Image
            key={i}
            alt="Card background"
            className="object-cover rounded-xl"
            src={url}
            width={270}
          />
          )
        }
      </CardBody>
      <CardFooter>
        <p>{format(new Date(dateFound), "dd MM yyyy")}</p>
      </CardFooter>
    </Card>
  );
};

export default MyCard;