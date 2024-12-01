import {
  Carousel as CR,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"
import { Spinner } from '../ui/spinner.tsx';

interface IProps {
  images: Image[]
}

type Image = {
  url: string;
  alt: string;
}

export const Carousel = (props: IProps) => {
  const { images } = props;

  return images.length ? <CR className={"mx-6"}>
    <CarouselContent>
      {images.map((image) => <CarouselItem key={image.alt} className="md:basis-2/3 lg:basis-1/3">{
        <img className={"rounded-xl"} src={`data:image/jpeg;base64,${image.url}`} alt={image.alt} />
      }</CarouselItem>)}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </CR> : <Spinner />
}