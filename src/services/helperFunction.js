export const daysAgo=(date)=>{
    const date1 = new Date(date);
    const date2 = new Date();
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
    let minutes = Math.ceil(diffTime/60/60/60)
    let hours = Math.ceil(diffTime/60/60/60/60)
    if(diffDays>1) return `${diffDays} days ago`
    if(diffDays>0) return `${diffDays} day ago`
    if(minutes<60) return `${minutes} minutes ago`
    if(hours<24) return `${hours} hours ago`


    
}
