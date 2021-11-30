
export const getResult =  (arrayQuote, text, startTime, correctLetters, mistakes)=>{
	const endTime = new Date();
	const seconds = (endTime - startTime) / 1000;
	const numberOfWords = text.split(' ').length;
	const wpm = Math.floor(( numberOfWords / seconds) * 60);
	const acc = Math.floor(((correctLetters - mistakes) / arrayQuote.length) * 100);;
	const accuracy = acc > 0 ? acc : 0;
	return {wpm, accuracy, numberOfWords}
};

export const replace = (element , classes)=>{
	element.classList.remove(...classes);
	element.classList.add(classes[0]);
};