function Cell(i, j, w){
    this.i = i
    this.j = j
    this.w = w
    this.show = () =>{
        rect(this.i*this.w, this.j*this.w, this.w,this.w)
    }
}