from sys import stdin, stdout,argv

def main():
	#print(argv[1])

	adatok=[]
	adatKell=[]


	f=open(argv[1])
	
	napDb=list(map(int, f.readline().split()))[1]

	for sor in f:
		#print(sor)
		if len(sor.strip())>0:
			adatok.append(list(map(int, sor.split())))
			atlag=sum(adatok[-1])/napDb
			if(max(adatok[-1])-atlag>atlag-min(adatok[-1])):
				adatKell.append(len(adatok))

	f.close

	stdout.write(str(len(adatKell)) + " " + " ".join(list(map(str, adatKell))))

main()



