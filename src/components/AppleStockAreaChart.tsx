// typescript-style import de React
import * as React from 'react';
import { useMemo } from 'react';

// @visx imports
import { AreaClosed } from '@visx/shape';
import { curveMonotoneX } from '@visx/curve';
import { scaleTime, scaleLinear } from '@visx/scale';

import { GridRows, GridColumns } from '@visx/grid';
import { LinearGradient } from '@visx/gradient';

// mock data
import appleStock, { AppleStock } from '@visx/mock-data/lib/mocks/appleStock';

// d3 imports
import { max, extent } from 'd3-array';

// set a data slice for rendering
const stock = appleStock.slice(800);
console.log(stock);

// set data accessor functions
const getDate = (d: AppleStock) => new Date(d.date); // set to JS Date object
const getStockValue = (d: AppleStock) => d.close;

// set gradient colors
export const bground1 = '#3b6978';
export const bground2 = '#204051';
export const areaColor = '#edffea';

// set d3 margin convention
const margin = { top: 0, right: 0, bottom: 0, left: 0 };

// define types for Props
type AreaChartProps = {
  width: number;
  height: number;
};

function AppleStockAreaChart({ width, height }: AreaChartProps) {
  // set chart bounds
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // set scales - scaleTime for x-axis, scaleLinear for y-axis
  const dateScale = useMemo(
    () =>
      scaleTime({
        range: [margin.left, innerWidth + margin.left],
        domain: extent(stock, getDate) as [Date, Date],
      }),
    [innerWidth]
  );
  const stockValueScale = useMemo(
    () =>
      scaleLinear({
        range: [innerHeight + margin.top, margin.top],
        domain: [0, (max(stock, getStockValue) || 0) + innerHeight / 3],
        nice: true,
      }),
    [innerHeight]
  );

  return (
    <svg width={width} height={height} className="chart-svg">
      <rect
        width={width}
        height={height}
        x={0}
        y={0}
        rx={25}
        fill="url(#bground-gradient)"
      />
      <LinearGradient id="bground-gradient" from={bground1} to={bground2} />
      <LinearGradient
        id="area-gradient"
        from={areaColor}
        to={areaColor}
        toOpacity={0.1}
      />
      <GridRows
        scale={stockValueScale}
        width={innerWidth}
        left={margin.left}
        stroke={areaColor}
        strokeDasharray="1,3"
        strokeOpacity={0.5}
        pointerEvents="none"
      />
      <GridColumns
        scale={dateScale}
        height={innerHeight}
        top={margin.top}
        stroke={areaColor}
        strokeDasharray="1,3"
        strokeOpacity={0.5}
        pointerEvents="none"
      />
      <AreaClosed<AppleStock>
        data={stock}
        yScale={stockValueScale}
        x={(d) => dateScale(getDate(d)) ?? 0}
        y={(d) => stockValueScale(getStockValue(d)) ?? 0}
        curve={curveMonotoneX}
        stroke={areaColor}
        strokeWidth={1}
        fill="url(#area-gradient)"
      />
    </svg>
  );
}

export default AppleStockAreaChart;
