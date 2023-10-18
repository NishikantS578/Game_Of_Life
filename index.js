const container = document.querySelector(".container");
const play = document.querySelector("button");

const ctx = container.getContext("2d");
container.style.width = "800px";
container.style.height = "800px";
width = 800;
height = width;
const resolution = 100;

container.addEventListener("mousemove", updateInput);
play.addEventListener("click", playGame);

let array=[];
reset();
render();

function render()
{
	for(let i=0; i<resolution; i++)
	{
		for(let j=0; j<resolution; j++)
		{
			if(array[i][j] == 1)
			{
				ctx.fillStyle = "green";
				ctx.fillRect(
					i * (width / resolution),
					j * (height / resolution),
					width / resolution,
					height / resolution
				);
			}
			else
			{
				ctx.strokeStyle = "black";
				ctx.lineWidth = 1;
				ctx.strokeRect(
					i * (width / resolution),
					j * (height / resolution),
					width / resolution,
					height / resolution
				);
				ctx.fillStyle = "white";
				ctx.fillRect(
					i * (width / resolution),
					j * (height / resolution),
					width / resolution,
					height / resolution
				);
			}
		}
	}
}


function reset()
{
	for(let i=0;i<resolution;i++)
	{
		array[i]=[];
		for(let j=0;j<resolution;j++)
		{
			array[i][j] = 0;
		}
	}
}

function updateInput(e)
{
	array[parseInt(e.offsetX / (width / resolution))][parseInt(e.offsetY / (height / resolution))] = 1;
	render();
}

function playGame()
{
	let sum = [];
	for(let i = 0; i < resolution; i++)
	{
		sum[i] = [];
		for(let j = 0; j < resolution; j++)
		{
			sum[i][j] = 0;
			(i - 1 > -1 && j - 1 > -1) ? sum[i][j] += array[i - 1][j - 1] : sum[i][j] += 0 ;
			(i - 1 > -1) ? sum[i][j] += array[i - 1][j] : sum[i][j] += 0 ;
			(i - 1 > -1 && j + 1 < resolution) ? sum[i][j] += array[i - 1][j + 1] : sum[i][j] += 0 ;
			(j - 1 > -1) ? sum[i][j] += array[i][j - 1] : sum[i][j] += 0 ;
			(j + 1 < resolution) ? sum[i][j] += array[i][j + 1] : sum[i][j] += 0 ;
			(i + 1 < resolution && j - 1 > -1) ? sum[i][j] += array[i + 1][j - 1] : sum[i][j] += 0 ;
			(i + 1 < resolution) ? sum[i][j] += array[i + 1][j] : sum[i][j] += 0 ;
			(i + 1 < resolution && j + 1 < resolution) ? sum[i][j] += array[i + 1][j + 1] : sum[i][j] += 0;
		}
	}
	for(let i = 0; i < resolution; i++)
	{
		for(let j = 0; j < resolution; j++)
		{
			console.log(sum[i][j]);
			switch(sum[i][j])
			{
				case 0:
				case 1:
					{
						array[i][j] = 0;
						break;
					}
				case 2:
					{
						break;
					}
				case 3:
					{
						array[i][j] = 1;
						break;
					}
				case 4:
				case 5:
				case 6:
				case 7:
				case 8:
					{
						array[i][j] = 0;
						break;
					}
			}
		}
	}
	render();
	setTimeout(playGame, 00);
}






















