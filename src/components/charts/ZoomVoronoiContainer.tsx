import {
  VictoryVoronoiContainerProps,
  VictoryZoomContainerProps,
  createContainer,
} from "victory";

export default createContainer<
  VictoryZoomContainerProps,
  VictoryVoronoiContainerProps
>("zoom", "voronoi");
