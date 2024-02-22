const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const playlist = $('.playlist');
const cd = $('.cd-thumb');
const cdWidth = cd.offsetWidth;
const soundWave = $('.sound-wave');
const cdSoundWave = cd.offsetWidth;
const headingName = $('.name');
const headingSinger = $('.singer');
const cdThumb = $('.cd-thumb');
const audio = $('.audio');
const playBtn = $('.toggle-btn');
const player = $('.player');
const progress = $('.progress')
const nextBtn = $('.next-btn');
const prevBtn = $('.prev-btn');
const randomBtn = $('.random-btn');
const repeatBtn = $('.repeat-btn');
isRepeat = false;
isRandom = false;
isPlaying = false;
_this = this;





const app = {
    currentIndex: 0,
     songs : [
        {
            name: 'Có chàng trai viết lên cây',
            singer: 'Phan Mạnh Quỳnh',
            image: './assets/image/có chàng trai viết lên cây.jfif',
            path:'./assets/music/có chàng trai viết.mp3',
        },
        {
            name: 'Lối nhỏ',
            singer: 'Đen vâu',
            image: './assets/image/lối nhỏ.jfif',
            path:'./assets/music/y2mate.com - Đen  Lối Nhỏ ft Phương Anh Đào MV.mp3',
        },
        {
            name: 'Tháng 4 là lời nói dối của em',
            singer: 'Hà Anh Tuấn',
            image: './assets/image/tháng 4 là lời nói dối 2.jpg',
            path:'./assets/music/y2mate.com - Hà Anh Tuấn  Tháng Tư Là Lời Nói Dối Của Em Official MV.mp3',
        },
        {
            name: 'Dạ vũ',
            singer: 'Tăng Duy Tân',
            image: './assets/image/dạ vũ.jfif',
            path:'./assets/music/y2mate.com - BAE TĂNG DUY TÂN  DẠ VŨ  Official Music Video.mp3',
        },
        {
            name: 'Bên trên tầng lầu',
            singer: 'Tăng Duy Tân',
            image: './assets/image/bên trên tầng lầu.jfif',
            path:'./assets/music/y2mate.com - BAE Tăng Duy Tân  Bên Trên Tầng Lầu  Official Lyric Video.mp3',
        },
        {
            name: 'autumn in my heart',
            singer: 'Zing mp3',
            image: './assets/image/autumn in my heart.jfif',
            path:'./assets/music/y2mate.com - Autumn In My Heart.mp3',
        },
        {
            name: 'Tâm sự tuổi 30',
            singer: 'Trịnh Thăng Bình',
            image: './assets/image/tâm sự tuổi 30.jfif',
            path:'./assets/music/y2mate.com - TÂM SỰ TUỔI 30  TRỊNH THĂNG BÌNH  OST ÔNG NGOẠI TUỔI 30.mp3',
        },
        {
            name: 'Lạ Lùng',
            singer: 'Vũ',
            image: './assets/image/lạ lùng.jfif',
            path:'./assets/music/y2mate.com - LẠ LÙNG  Vũ Original.mp3',
        },
        {
            name: 'Âm thầm bên em',
            singer: 'Sơn tùng M-TP',
            image: './assets/image/âm thầm bên em.jfif',
            path:'./assets/music/y2mate.com - Âm Thầm Bên Em Lofi Ver  Sơn Tùng MTP x Quanvrox.mp3',
        },
        {
            name: 'Đi về nhà',
            singer: 'Đen Vâu',
            image: './assets/image/đi về nhà.jfif',
            path:'./assets/music/y2mate.com - Đen x JustaTee  Đi Về Nhà MV.mp3',
        },
        {
            name: 'Blue tequila',
            singer: 'Táo',
            image: './assets/image/blue tequila.jfif',
            path:'./assets/music/y2mate.com - Táo  Blue Tequila Official Video.mp3',
        },
    ],

    render : function () {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index = '${index}'>
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body-song">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>
        `
        })

        playlist.innerHTML = htmls.join('');
    },

    handleEvent: function () {

        // xử lí phóng to / thu nhỏ cd thumb
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newWidth = cdWidth - scrollTop
            cd.style.width = newWidth > 0 ? newWidth + 'px' : 0 
            cd.style.opacity = newWidth / cdWidth
        };


        

        // xử lí khi click nút play
        playBtn.onclick = function() {    
            if (_this.isPlaying) {
               audio.pause()
            } else {
                audio.play();
            }
            };

            // khi song được play
            audio.onplay = function () {
                _this.isPlaying = true
                player.classList.add('playing')
                cdThumbAnimate.play();

            }

            // khi song bị pause 
            audio.onpause = function () {
                _this.isPlaying = false   
                player.classList.remove('playing')
                cdThumbAnimate.pause();
            }

            // khi tiến độ bài hát thay đổi
            audio.ontimeupdate = function () {
                if (audio.duration) {
                    const progressPercent = audio.currentTime / audio.duration * 100
                    progress.value = progressPercent
                }
            }

            

            // khi tua song bằng thanh progress
            progress.oninput = function () {
              const seek =  audio.duration / 100 * progress.value
                audio.currentTime = seek 
            }

            // khi quay cd 
            const cdThumbAnimate = cdThumb.animate([ 
            {
                transform: 'rotate(360deg)'
            }
            ], {
                duration : 10000,
                iterations: Infinity
            })
            cdThumbAnimate.pause();

            // khi next song 
            nextBtn.onclick = function () {
                if(app.isRandom) {
                    app.playRandomSong();
                } else {
                    app.nextSong();
                }
                audio.play(); 
                app.render();  
                app.scrollToActiveSong();
            }



            // khi prevsong 

            prevBtn.onclick = function () {
                if (app.isRandom) {
                    app.playRandomSong();
                } else {
                    app.prevSong();
                }
                audio.play();
                app.render();
                app.scrollToActiveSong();
            }

            // khi click vao random
            randomBtn.onclick = function () {
                app.isRandom = !app.isRandom
                randomBtn.classList.toggle('active', app.isRandom)
            }

            // khi click vao nut repeat 
            repeatBtn.onclick = function () {
                app.isRepeat = !app.isRepeat
                repeatBtn.classList.toggle('active', app.isRepeat)
            }

            // next song khi ended
            audio.onended = function () {
                if (app.isRepeat) {
                    audio.play();
                } else {
                    nextBtn.click();
                }
            }

            // active song when click intoview 
            playlist.onclick = function (e) {
                const songNode = e.target.closest('.song:not(.active)')
                if (songNode || e.target.closest('.option'))
                {
                    app.currentIndex = Number(songNode.dataset.index)
                    app.loadCurrentSong();
                    app.render();
                    audio.play();
                }
            }
    },

    scrollToActiveSong: function () {
        setTimeout (() => {
            if (this.currentIndex === 0) {
                $('.song.active').scrollIntoView({
                    behavior: 'smooth',
                    block: 'end',
                })
            } else {
                $('.song.active').scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                })
            }
        }, 300) 
    },

    playRandomSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)    
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong();
    },

    nextSong: function () {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },

        

    prevSong: function () {
        this.currentIndex--
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong(); 
    },  
    
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get : function () {
                return this.songs[this.currentIndex]
            }
        }) 
    },

    loadCurrentSong: function () {
        headingSinger.textContent = this.currentSong.singer;
        headingName.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
        console.log(audio)
    },

    start : function () {
        this.defineProperties();
        
        this.render();
        
        this.loadCurrentSong();
        
        this.handleEvent();
        
    },
};

app.start();





