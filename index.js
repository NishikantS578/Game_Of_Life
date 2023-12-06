const container = document.querySelector(".canvas")
const playButton = document.querySelector("button")
const increase_resolution_btn = document.querySelector(".increaseResolution")
const decrease_resolution_btn = document.querySelector(".decreaseResolution")
const resolution_el = document.querySelector(".resolution")
const prebuilt_el = document.querySelector(".prebuiltSetups")

const ctx = container.getContext("2d")
let resolution = 50
container.style.width = "800px"
container.style.height = "800px"
let width = 800
let height = width
let array=[]
let running = false

resolution_el.textContent = resolution
reset()
render()

document.addEventListener("click", function(e){
    if(e.target == playButton){
        if(running == false){
            running = true
            e.target.textContent = "Pause"
            playGame()
        }
        else{
            running = false
            e.target.textContent = "Play"
        }
    }
    else if(e.target == increase_resolution_btn){
        resolution++
        resolution_el.textContent = resolution
        reset()
        render()
    }
    else if(e.target == decrease_resolution_btn){
        if(resolution != 2){
            resolution--
            resolution_el.textContent = resolution
            reset()
            render()
        }
    }
})

document.addEventListener("mousemove", function(e){
    if(e.target == container){
        updateInput(e)
    }
})

document.addEventListener("change", function(e){
    if(e.target == prebuilt_el){
        loadSetup(e)
        render()
    }
})

function render()
{
	for(let i=0; i<resolution; i++)
	{
		for(let j=0; j<resolution; j++)
		{
			if(array[i][j] == 1)
			{
				ctx.fillStyle = "green"
				ctx.fillRect(
					i * (width / resolution),
					j * (height / resolution),
					width / resolution,
					height / resolution
				)
			}
			else
			{
				ctx.strokeStyle = "black"
				ctx.lineWidth = 1
				ctx.strokeRect(
					i * (width / resolution),
					j * (height / resolution),
					width / resolution,
					height / resolution
				)
				ctx.fillStyle = "white"
				ctx.fillRect(
					i * (width / resolution),
					j * (height / resolution),
					width / resolution,
					height / resolution
				)
			}
		}
	}
}

function reset()
{
	for(let i=0;i<resolution;i++)
	{
		array[i]=[]
		for(let j=0;j<resolution;j++)
		{
			array[i][j] = 0
		}
	}
}

function updateInput(e)
{
	if(e.ctrlKey != true)
	{
		array[parseInt(e.offsetX / (width / resolution))]
            [parseInt(e.offsetY / (height / resolution))] = 1
		render()
	}
}

function playGame()
{
	let sum = []
	for(let i = 0; i < resolution; i++)
	{
		sum[i] = []
		for(let j = 0; j < resolution; j++)
		{
			sum[i][j] = 0
			i - 1 > -1 && j - 1 > -1 ?
                sum[i][j] += array[i - 1][j - 1] :
                sum[i][j] += 0 
			i - 1 > -1 ?
                sum[i][j] += array[i - 1][j] :
                sum[i][j] += 0 
			i - 1 > -1 && j + 1 < resolution ? 
                sum[i][j] += array[i - 1][j + 1] :
                sum[i][j] += 0 
			j - 1 > -1 ?
                sum[i][j] += array[i][j - 1] :
                sum[i][j] += 0 
			j + 1 < resolution ?
                sum[i][j] += array[i][j + 1] :
                sum[i][j] += 0 
			i + 1 < resolution && j - 1 > -1 ?
                sum[i][j] += array[i + 1][j - 1] :
                sum[i][j] += 0 
			i + 1 < resolution ?
                sum[i][j] += array[i + 1][j] :
                sum[i][j] += 0 
			i + 1 < resolution && j + 1 < resolution ?
                sum[i][j] += array[i + 1][j + 1] :
                sum[i][j] += 0
		}
	}
	for(let i = 0; i < resolution; i++)
	{
		for(let j = 0; j < resolution; j++)
		{
			switch(sum[i][j])
			{
				case 0:
				case 1:
					{
						array[i][j] = 0
						break
					}
				case 2:
					{
						break
					}
				case 3:
					{
						array[i][j] = 1
						break
					}
				case 4:
				case 5:
				case 6:
				case 7:
				case 8:
					{
						array[i][j] = 0
						break
					}
			}
		}
	}
	render()
    if(running){
        setTimeout(playGame, 100)
    }
}

function loadSetup(e){
    if(e.target.value == "block"){
        array[1][1] = 1
        array[1][2] = 1
        array[2][1] = 1
        array[2][2] = 1
    }
    else if(e.target.value == "blinker"){
        array[1][1] = 1
        array[1][2] = 1
        array[1][3] = 1
    }
    else if(e.target.value == "bee-hive"){
        array[1][2] = 1
        array[1][3] = 1
        array[2][1] = 1
        array[2][4] = 1
        array[3][2] = 1
        array[3][3] = 1
    }
    else if(e.target.value == "loaf"){
        array[1][2] = 1
        array[1][3] = 1
        array[2][1] = 1
        array[2][4] = 1
        array[3][2] = 1
        array[3][4] = 1
        array[4][3] = 1
    }
    else if(e.target.value == "boat"){
        array[1][1] = 1
        array[1][2] = 1
        array[2][1] = 1
        array[2][3] = 1
        array[3][2] = 1
    }
    else if(e.target.value == "tub"){
        array[1][2] = 1
        array[2][1] = 1
        array[2][3] = 1
        array[3][2] = 1
    }
    else if(e.target.value == "toad"){
        array[1][2] = 1
        array[1][3] = 1
        array[1][4] = 1
        array[2][1] = 1
        array[2][2] = 1
        array[2][3] = 1
    }
    else if(e.target.value == "beacon"){
        array[1][1] = 1
        array[1][2] = 1
        array[2][1] = 1
        array[2][2] = 1
        array[3][3] = 1
        array[3][4] = 1
        array[4][3] = 1
        array[4][4] = 1
    }
    else if(e.target.value == "pulsar"){
        array[1][5] = 1
        array[1][11] = 1
        array[2][5] = 1
        array[2][11] = 1
        array[3][5] = 1
        array[3][6] = 1
        array[3][10] = 1
        array[3][11] = 1
        array[5][1] = 1
        array[5][2] = 1
        array[5][3] = 1
        array[5][6] = 1
        array[5][7] = 1
        array[5][9] = 1
        array[5][10] = 1
        array[5][13] = 1
        array[5][14] = 1
        array[5][15] = 1
        array[6][3] = 1
        array[6][5] = 1
        array[6][7] = 1
        array[6][9] = 1
        array[6][11] = 1
        array[6][13] = 1
        array[7][5] = 1
        array[7][6] = 1
        array[7][10] = 1
        array[7][11] = 1
        array[9][5] = 1
        array[9][6] = 1
        array[9][10] = 1
        array[9][11] = 1
        array[10][3] = 1
        array[10][5] = 1
        array[10][7] = 1
        array[10][9] = 1
        array[10][11] = 1
        array[10][13] = 1
        array[11][1] = 1
        array[11][2] = 1
        array[11][3] = 1
        array[11][6] = 1
        array[11][7] = 1
        array[11][9] = 1
        array[11][10] = 1
        array[11][13] = 1
        array[11][14] = 1
        array[11][15] = 1
        array[13][5] = 1
        array[13][6] = 1
        array[13][10] = 1
        array[13][11] = 1
        array[14][5] = 1
        array[14][11] = 1
        array[15][5] = 1
        array[15][11] = 1
    }
    else if(e.target.value == "penta-decathlon"){
        array[5][4] = 1
        array[5][5] = 1
        array[5][6] = 1
        array[6][4] = 1
        array[6][6] = 1
        array[7][4] = 1
        array[7][5] = 1
        array[7][6] = 1
        array[8][4] = 1
        array[8][5] = 1
        array[8][6] = 1
        array[9][4] = 1
        array[9][5] = 1
        array[9][6] = 1
        array[10][4] = 1
        array[10][5] = 1
        array[10][6] = 1
        array[11][4] = 1
        array[11][6] = 1
        array[12][4] = 1
        array[12][5] = 1
        array[12][6] = 1
    }
    else if(e.target.value == "glider"){
        array[1][3] = 1
        array[2][1] = 1
        array[2][3] = 1
        array[3][2] = 1
        array[3][3] = 1
    }
    else if(e.target.value == "light-weight-spaceship"){
        array[1][3] = 1
        array[1][4] = 1
        array[2][2] = 1
        array[2][3] = 1
        array[2][4] = 1
        array[2][5] = 1
        array[3][2] = 1
        array[3][3] = 1
        array[3][5] = 1
        array[3][6] = 1
        array[4][4] = 1
        array[4][5] = 1
    }
    else if(e.target.value == "middle-weight-spaceship"){
        array[1][5] = 1
        array[1][6] = 1
        array[2][2] = 1
        array[2][3] = 1
        array[2][4] = 1
        array[2][6] = 1
        array[2][7] = 1
        array[3][2] = 1
        array[3][3] = 1
        array[3][4] = 1
        array[3][5] = 1
        array[3][6] = 1
        array[4][3] = 1
        array[4][4] = 1
        array[4][5] = 1
    }
    else if(e.target.value == "heavy-weight-spaceship"){
        array[1][3] = 1
        array[1][4] = 1
        array[2][1] = 1
        array[2][6] = 1
        array[3][7] = 1
        array[4][1] = 1
        array[4][7] = 1
        array[5][2] = 1
        array[5][3] = 1
        array[5][4] = 1
        array[5][5] = 1
        array[5][6] = 1
        array[5][7] = 1
    }
    else if(e.target.value == "gosper-glider-gun"){
        array[1][25] = 1
        array[2][23] = 1
        array[2][25] = 1
        array[3][13] = 1
        array[3][14] = 1
        array[3][21] = 1
        array[3][22] = 1
        array[3][35] = 1
        array[3][36] = 1
        array[4][12] = 1
        array[4][16] = 1
        array[4][21] = 1
        array[4][22] = 1
        array[4][35] = 1
        array[4][36] = 1
        array[5][1] = 1
        array[5][2] = 1
        array[5][11] = 1
        array[5][17] = 1
        array[5][21] = 1
        array[5][22] = 1
        array[6][1] = 1
        array[6][2] = 1
        array[6][11] = 1
        array[6][15] = 1
        array[6][17] = 1
        array[6][18] = 1
        array[6][23] = 1
        array[6][25] = 1
        array[7][11] = 1
        array[7][17] = 1
        array[7][25] = 1
        array[8][12] = 1
        array[8][16] = 1
        array[9][13] = 1
        array[9][14] = 1
    }
    else if(e.target.value == "simkin-glider-gun"){
        array[11][15] = 1
        array[12][15] = 1
        array[18][15] = 1
        array[19][15] = 1
        array[11][16] = 1
        array[12][16] = 1
        array[18][16] = 1
        array[19][16] = 1
        array[15][18] = 1
        array[16][18] = 1
        array[15][19] = 1
        array[16][19] = 1
        array[33][24] = 1
        array[34][24] = 1
        array[36][24] = 1
        array[37][24] = 1
        array[32][25] = 1
        array[38][25] = 1
        array[32][26] = 1
        array[39][26] = 1
        array[42][26] = 1
        array[43][26] = 1
        array[32][27] = 1
        array[33][27] = 1
        array[34][27] = 1
        array[38][27] = 1
        array[42][27] = 1
        array[43][27] = 1
        array[37][28] = 1
        array[31][32] = 1
        array[32][32] = 1
        array[31][33] = 1
        array[32][34] = 1
        array[33][34] = 1
        array[34][34] = 1
        array[34][35] = 1
    }
}





















