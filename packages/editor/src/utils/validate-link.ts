const validateLink = (link: string) => {
  if(link==="")
    return true;
  const youtubeRegEx = new RegExp(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/);  
  return youtubeRegEx.test(link);
}

export default validateLink;