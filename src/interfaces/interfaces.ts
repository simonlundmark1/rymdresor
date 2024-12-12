export interface AvailableTrip {
    date: string;
    price: number;
  }
  
  export interface Experience {
    id: number;
    title: string;
    description: string;
    image: string[];
    availableTrips: AvailableTrip[];
  }
  
  export interface ExperiencesData {
    experiences: Experience[];
  }