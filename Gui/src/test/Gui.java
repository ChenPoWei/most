package test;
//²�檺�ťյ���
import javax.swing.JFrame;

public class Gui {

	static int width =1000;

	static int height =1000;

	public static void main(String[] args){
		
		JFrame jf= new JFrame("helloswingBWF");

		jf.setSize( width , height );//�]�m���f�j�p

		jf.setDefaultCloseOperation(JFrame. EXIT_ON_CLOSE );//�ϵ��f�W���̤j�ơB�̤p�ƥH���������o���@��

		jf.setVisible( true );//�]�m����O�_�i��
		}

}
