class AnimeLoader extends HTMLElement {
 
    constructor(){
        super()
        const width = 28
        const circleRadius = 2
        const circles = 8
        const root = this.attachShadow({mode: 'open'})
        root.innerHTML = `<div>
         ${this.buildStyle(width,circleRadius*2,circles)}
         ${this.buildTrail(width/2 - circleRadius,circleRadius*2)}
         ${this.buildCircle(width,circles,circleRadius)}
        </div>`
    }

    buildCircle (w,n,r){
       let dom = `<svg class="circles" width="${w}" height="${w}" viewBox="0 0 ${w} ${w}" >`
       const radius = (w / 2 -r)

       for(let i = 0;i<n;i++){
           const a = i * (Math.PI * 2) / n

           const x = radius * Math.sin(a) + w/2
           const y = radius * Math.cos(a) + w/2
           dom += `<circle cx="${x}" cy="${y}" r="${r}" fill="currentColor"/>`
       }

       return dom + '</svg>'
    }

    buildTrail (r,stroke){
        const w=r * 2 + stroke
        let dom = `<svg class="trail" width="${w}" height="${w}" viewBox="0 0 ${w} ${w}" 
        fill= "none">`

        dom += `<circle cx="${w/2}" cy="${w/2}" r="${r}" 
        stroke="currentColor"
        stroke-width="${stroke}"
        stroke-linecap="round"/>`

 
        return dom + '</svg>'
    }

    buildStyle(w,stroke,n){
        const perimeter = Math.PI * (w - stroke)
        return `
        <style>
        :host{
            display: inline-block;
        }
           div {
               width: ${w}px;
               height: ${w}px;
               position:relative;
           }
           svg{
               position:absolute;
               top:0;
               left:0
           }
           .circles{
              animation: spin 16s linear infinite;
           } 
           
           @keyframes spin {
               from {transform: rotate(0deg)}
               to {transform: rotate(360deg)}
           }

           .trail{
               stroke-dasharray:${perimeter};
               stroke-dashoffset:${perimeter + perimeter/n};
               animation: spin2 1.6s cubic-beZier(.5,.15,.5,.85) infinite;
           }
           .trail circle{
            animation: trail 1.6s cubic-beZier(.5,.15,.5,.85) infinite;
               
           }

           @keyframes spin2 {
            from {transform: rotate(0deg)}
            to {transform: rotate(720deg)}
        }
        @keyframes trail {
            0%{stroke-dashoffset:${perimeter + perimeter/n};}
            50% {stroke-dashoffset:${perimeter + 2 * perimeter/n};}
            100% {stroke-dashoffset:${perimeter + perimeter/n};}
        }
        </style>
        `
    }

}


try{
   customElements.define("anime-loader",AnimeLoader) 
}catch(e){
    if(e instanceof DOMException){
        console.error('DOMException:' + e.message)
    }else{
        throw e
    }
}