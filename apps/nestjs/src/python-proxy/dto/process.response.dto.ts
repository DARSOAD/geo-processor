export class ProcessResponseDto {
  fromCache!: boolean;
  centroid!: { lat: number; lng: number };
  bounds!: { north: number; south: number; east: number; west: number };
}
