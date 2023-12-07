setGame("1200x600");
game.folder = "assets";
//file gambar yang dipakai dalam game
var gambar = {
	logo:"logo.png",
	startBtn:"tombolStart.png",
	cover:"cover-bg.png",
	coverawal:"bg_hutan.jpg",
	playBtn:"btn-play.png",
	maxBtn:"maxBtn.png",
	minBtn:"minBtn.png",
	idle:"Idle.png",
	run:"Run.png",
	jump:"Jump.png",
	fall:"Fall.png",
	hit:"hit_kodok.png",
	run2:"run_kodok.png",
	jump2:"jump_kodok.png",
	fall2:"fall_kodok.png",
	hit2:"hit_kodok.png",
	tileset:"Terrain.png",
	bg:"bg-lv.jpg",
	item1: "Melon.png",
	item2: "Bananas.png",
	musuh1Idle: "idlemusuh.png",
	musuh1Run: "runmusuh.png",
	musuh1Hit: "hitmusuh.png",
	bendera: "Flag.png"	
}
//file suara
var suara = {
	suara: "musiknya-tom_holland.mp3"
}

//load gambar dan suara lalu jalankan startScreen
loading(gambar, suara, startScreen);

function startScreen(){	
	hapusLayar("#228B22");
	tampilkanGambar(dataGambar.coverawal, 600, 250);
	// mainkanSuara(dataSuara.suara);
	var startBtn = tombol(dataGambar.startBtn, 600, 400);
	if (tekan(startBtn)){
		mainkanSuara(dataSuara.suara);
		jalankan(halamanCover);
	}
}
function halamanCover(){
	hapusLayar("#67d2d6");
	gambarFull(dataGambar.cover);
	var playBtn = tombol(dataGambar.playBtn, 1100, 500);
	if (tekan(playBtn)){
		setAwal();
		// mainkanSuara(dataSuara.suara);
		jalankan(gameLoop);
	}	
	resizeBtn(1150,50);
}

function setAwal(){
	game.hero = setSprite(dataGambar.idle, 32, 32);
	game.skalaSprite = 2;
	game.hero.animDiam = dataGambar.idle;
	game.hero.animLompat = dataGambar.jump2;
	game.hero.animJalan = dataGambar.run;
	game.hero.animJatuh = dataGambar.fall;
	game.hero.animMati = dataGambar.hit;
	setPlatform(this["map_"+game.level], dataGambar.tileset, 32, game.hero);
	game.gameOver = ulangiPermainan;
	setPlatformItem(1, dataGambar.item1);
	setPlatformItem(2, dataGambar.item2);
	var musuh1 = {};
	musuh1.animDiam = dataGambar.musuh1Idle;
	musuh1.animJalan = dataGambar.musuh1Run;
	musuh1.animMati = dataGambar.musuh1Hit;
	setPlatformEnemy(1, musuh1);
	setPlatformTrigger(1, dataGambar.bendera);
}

function ulangiPermainan(){
	game.aktif = true;
	setAwal();
	jalankan(gameLoop);
}

function gameLoop(){
	hapusLayar();
	if (game.kanan) {
		gerakLevel(game.hero, 3, 0);
	}else if (game.kiri) {
		gerakLevel(game.hero, -3, 0);
	}
	if (game.atas) {
		gerakLevel(game.hero, 0, -10);
	}
	latar (dataGambar.bg, 0, 0);
	buatLevel();
	cekItem();
	teks(game.score, 40, 60);
}

function cekItem(){
	if (game.itemID > 0) {
		tambahScore(15);
		game.itemID = 0;
	}
	if (game.triggerID == 1) {
		game.triggerID = 0;
		game.aktif = false;
		game.level++;
		setTimeout(ulangiPermainan)
	}
}