import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { format } from "date-fns";
import { IPost } from "../types";

const MyCard = ({ post }: { post: IPost }) => {
  const { title, category, location, images, city, dateFound } = post || {};

  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <small className="text-default-500">
          {location} , {city}
        </small>
        <h4 className="font-bold text-large">{title}</h4>
      </CardHeader>
      <CardBody className="overflow-hidden py-2">
        {images?.map((imUrl: string, i: number) => (
          <div
            key={i}
            className='rounded-lg h-48'
            style={{
              backgroundImage: `url(${imUrl})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat"
            }}
          >
            <p className="bg-emerald-500 m-1 rounded-lg p-2 text-tiny uppercase font-bold">{category.name}</p>
          </div>
        ))}
      </CardBody>
      <CardFooter>
        <p>{format(new Date(dateFound), "dd MM yyyy")}</p>
      </CardFooter>
    </Card>
  );
};

export default MyCard;
